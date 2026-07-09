from collections import defaultdict
from datetime import datetime
from agents.knowledge_graph.reputation_engine import ReputationEngine
from agents.knowledge_graph.experience_replay import ExperienceReplay
import json
import os
from agents.knowledge_graph.playbook_repository import PlaybookRepository



class OutcomeMemory:
    """
    Enterprise Outcome Memory

    Learns from every resolved incident.

    Stores:
        • Playbook effectiveness
        • Recovery performance
        • Financial impact
        • Analyst feedback
        • Containment success

    This becomes the experience layer of the
    Enterprise Brain.
    """

    def __init__(self):

        self.records = []

        self.playbook_stats = defaultdict(list)

        self.attack_stats = defaultdict(list)

        self.reputation = ReputationEngine()

        self.replay_engine = ExperienceReplay()

        self.db_file = "data/outcomes.json"

        self._load_database()

    def _load_database(self):
        """
        Load historical outcome memory from disk.
        """

        if not os.path.exists(self.db_file):
            return

        with open(self.db_file, "r") as f:
            data = json.load(f)

        for record in data:

            record["timestamp"] = datetime.fromisoformat(
                record["timestamp"]
            )

            self.records.append(record)

            self.playbook_stats[
                record["playbook"]
            ].append(record)

            key = (
                record["attack"],
                record["fingerprint"]["mitre"],
                record["asset"],
                record["severity"]
            )

            self.attack_stats[key].append(record)

            self.reputation.update(
                record["playbook"],
                record["success"],
                record["recovery_minutes"],
                record["business_loss"],
                record["analyst_rating"]
            )
    
    def _save_database(self):
        """
        Save outcome memory to disk.
        """

        os.makedirs("data", exist_ok=True)

        records = []

        for record in self.records:

            r = record.copy()

            r["timestamp"] = r["timestamp"].isoformat()

            records.append(r)

        print("Saving database...")
        print(self.db_file)

        

        print("\n========== SAVE ==========")
        print("Current directory:", os.getcwd())
        print("Database path:", self.db_file)
        print("==========================")

        with open(self.db_file, "w") as f:

            json.dump(
                records,
                f,
                indent=4
            )
        print(os.getcwd())

    def learn(
        self,
        incident,
        playbook,
        recovery_minutes,
        business_loss,
        success,
        services_saved,
        services_lost,
        blast_before,
        blast_after,
        analyst_rating=5,
        notes="",
        false_positive=False,
    ):
        
        print("\n========== ENTERPRISE BRAIN ==========")
        print("learn_outcome() called")
        print("Playbook:", playbook)
        print("=====================================\n")

        record = {

            "timestamp": datetime.utcnow(),

            "incident_id": incident["incident_id"],

            "attack": incident["category"],

            "asset": incident["asset"]["hostname"],

            "severity": incident["severity"],

            "playbook": playbook,

            "fingerprint": self.build_fingerprint(incident),

            "recovery_minutes": recovery_minutes,

            "business_loss": business_loss,

            "success": success,

            "services_saved": services_saved,

            "services_lost": services_lost,

            "blast_radius_before": blast_before,

            "blast_radius_after": blast_after,

            "false_positive": false_positive,

            "analyst_rating": analyst_rating,

            "notes": notes

        }

        self.records.append(record)

        self.playbook_stats[playbook].append(record)

        mitre = incident.get("mitre", {})

        category = incident.get("category")

        mitre_id = mitre.get("id", "UNKNOWN")

        asset = incident.get(
            "asset",
            {}
        ).get(
            "hostname",
            "UNKNOWN"
        )

        severity = incident.get("severity")

        keys = [

            (
                category,
                mitre_id,
                asset,
                severity
            ),

            (
                category,
                mitre_id,
                asset
            ),

            (
                category,
                mitre_id
            ),

            (
                category,
            )

        ]

        for key in keys:

            self.attack_stats[key].append(record)


        self.reputation.update(
            playbook,
            success,
            recovery_minutes,
            business_loss,
            analyst_rating
        )

        self._save_database()

    def best_playbook(self, incident):
   
        mitre = incident.get("mitre", {})

        category = incident.get("category")

        mitre_id = mitre.get("id", "UNKNOWN")

        asset = incident.get(
            "asset",
            {}
        ).get(
            "hostname",
            "UNKNOWN"
        )

        severity = incident.get("severity")

        candidate_keys = [

            (
                category,
                mitre_id,
                asset,
                severity
            ),

            (
                category,
                mitre_id,
                asset
            ),

            (
                category,
                mitre_id
            ),

            (
                category,
            )

        ]

        history = []

        matched_level = None

        for level, key in enumerate(candidate_keys, start=1):

            if key in self.attack_stats:

                history = self.attack_stats[key]

                matched_level = level

                break

        if not history:

            return None

        scores = {}

        for item in history:

            pb = item["playbook"]

            if pb not in scores:

                scores[pb] = {

                    "success": 0,

                    "count": 0,

                    "recovery": 0,

                    "loss": 0,

                    "services_saved": 0,

                    "blast_reduction": 0,

                    "analyst": 0

                }

            scores[pb]["count"] += 1

            scores[pb]["recovery"] += item["recovery_minutes"]

            scores[pb]["loss"] += item["business_loss"]

            scores[pb]["services_saved"] += item["services_saved"]

            scores[pb]["blast_reduction"] += (

                item["blast_radius_before"]

                -

                item["blast_radius_after"]

            )

            scores[pb]["analyst"] += item["analyst_rating"]

            if item["success"]:

                scores[pb]["success"] += 1

        repo = PlaybookRepository()

        recommendations = []

        for pb, stats in scores.items():

            reputation = self.reputation.score(pb)

            prior_success = 0.70
            prior_weight = 5

            success_rate = round(

                (
                    stats["success"] +
                    prior_success * prior_weight
                )

                /

                (
                    stats["count"] +
                    prior_weight
                )

                * 100,

                1

            )

            average_recovery = round(
                stats["recovery"] / stats["count"],
                1
            )

            average_loss = round(
                stats["loss"] / stats["count"],
                2
            )

            average_saved = round(

                stats["services_saved"]

                / stats["count"],

                1

            )

            average_blast_reduction = round(

                stats["blast_reduction"]

                / stats["count"],

                1

            )

            average_analyst = round(

                stats["analyst"]

                / stats["count"],

                1

            )

            # ------------------------
            # Normalize Recovery
            # Lower recovery is better
            # ------------------------

            recovery_score = max(
                0,
                100 - average_recovery
            )

            # ------------------------
            # Normalize Financial Loss
            # Lower loss is better
            # ------------------------

            loss_score = max(
                0,
                100 - average_loss * 10
            )

            # ------------------------
            # Analyst Rating
            # (temporary until analyst memory exists)
            # ------------------------

            analyst_score = average_analyst * 20

            # ------------------------
            # Overall Score
            # ------------------------

            service_score = min(
                100,
                average_saved * 15
            )

            blast_score = min(
                100,
                average_blast_reduction * 20
            )

            overall_score = round(
                success_rate * 0.25 +
                recovery_score * 0.15 +
                loss_score * 0.10 +
                analyst_score * 0.10 +
                service_score * 0.10 +
                blast_score * 0.10 +
                reputation * 0.20,
                1
            )
            confidence = round(

                success_rate * 0.35 +
                reputation * 0.25 +
                analyst_score * 0.15 +
                recovery_score * 0.10 +
                loss_score * 0.10 +
                min(
                    stats["count"] * 2,
                    5
                )
            )

            confidence = max(
                35,
                min(
                    confidence,
                    99
                )
            )

            recommendations.append({

                "playbook": repo.get(pb),

                "reputation": reputation,

                "overall_score": overall_score,

                "confidence": confidence,

                "success_rate": success_rate,

                "average_recovery": average_recovery,

                "average_loss": average_loss,

                "observations": stats["count"],

                "average_services_saved": average_saved,

                "average_blast_reduction": average_blast_reduction,

                "average_analyst_rating": average_analyst,

            })

        recommendations.sort(
            key=lambda x:
            x["overall_score"],
            reverse=True
        )

        best = recommendations[0]
        reasoning = []

        reasoning.append(

            f"{best['observations']} historical observations."

        )

        reasoning.append(

            f"Success rate {best['success_rate']}%."

        )

        reasoning.append(
            f"Enterprise reputation "
            f"{best['reputation']}/100."
        )

        reasoning.append(

            f"Average recovery "

            f"{best['average_recovery']} minutes."

        )

        reasoning.append(

            f"Average financial loss "

            f"₹{best['average_loss']} Cr."

        )
        best["reasoning"] = reasoning

        levels = {
            1: "Exact Incident (Category + MITRE + Asset + Severity)",
            2: "Category + MITRE + Asset",
            3: "Category + MITRE",
            4: "Category"
        }

        best["matched_using"] = levels[matched_level]

        
        return {

            "recommended": best,

            "ranking": recommendations

        }

    def history(self):

        return self.records
    
    def build_fingerprint(self, incident):

        mitre = incident.get("mitre", {})

        return {

            "category": incident.get("category"),

            "mitre": mitre.get("id", "UNKNOWN"),

            "asset": incident.get("asset"),

            "severity": incident.get("severity")

        }
    
    def replay(self, incident):

        
        print("Records:", len(self.records))

        return self.replay_engine.replay(

            incident,
            self.records,

        )