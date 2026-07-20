from agents.commander.forecast_engine import ForecastEngine
from agents.commander.decision_engine import DecisionEngine
from agents.digital_twin.digital_twin import CyberDigitalTwin
#from backend.models import incident
from core.brain_service import brain
from agents.commander.commander_repository import CommanderRepository
from agents.commander.predictive_intelligence import PredictiveIntelligence
from core.brain_service import brain
from agents.commander.outcome_evaluator import OutcomeEvaluator
from agents.commander.consensus_engine import ConsensusEngine
from datetime import UTC, datetime
from agents.business.business_vote import BusinessVote
from agents.risk.risk_vote import RiskVote
from agents.graph_ai.attack_graph_ai import AttackGraphAI
from agents.graph_ai.graph_reasoner import GraphReasoner
from agents.graph_ai.graph_vote import GraphVote
from agents.cyber_dna.cyber_dna import CyberDNA
from agents.cyber_dna.dna_similarity import DNASimilarity
from agents.cyber_dna.dna_vote import DNAVote
from agents.ueba.ueba_engine import UEBAEngine
from agents.ueba.ueba_vote import UEBAVote
from agents.xai.explanation_engine import ExplanationEngine
from agents.intelligence.intelligence_pipeline import IntelligencePipeline
from agents.council.debate_engine import DebateEngine
import traceback
from agents.correlation.enterprise_intelligence_builder import EnterpriseIntelligenceBuilder


class CommanderAI:
    """
    Enterprise Commander AI.

    Coordinates all intelligence agents.
    """

    def __init__(self):

        self.forecast = ForecastEngine()

        self.decision = DecisionEngine()

        self.digital_twin = CyberDigitalTwin()

        self.predictive = PredictiveIntelligence()

        self.xai = ExplanationEngine()

        self.brain = brain

        self.outcome_evaluator = OutcomeEvaluator()

        self.graph_ai = AttackGraphAI()

        self.graph_reasoner = GraphReasoner()

        self.graph_vote = GraphVote()

        self.cyber_dna = CyberDNA()

        self.dna_similarity = DNASimilarity()

        self.dna_vote = DNAVote()

        self.consensus = ConsensusEngine()

        self.business_vote = BusinessVote()

        self.risk_vote = RiskVote()

        self.ueba = UEBAEngine()

        self.ueba_vote = UEBAVote()

        self.intelligence = IntelligencePipeline()

        self.enterprise_builder = EnterpriseIntelligenceBuilder()

        self.debate = DebateEngine()

  
    def _store_outcome(
        self,
        incident,
        strategic,
        business
    ):
        """
        Temporary automatic learning.

        Later this will execute after the SOC
        closes the incident.
        """

        incident = self.intelligence.build(
            incident
        )

        best = strategic["recommended"]

        evaluation = self.outcome_evaluator.evaluate(
            best,
            business
        )

        #print()
        #print("===== STORE OUTCOME =====")
        #print(best.keys())
        #print(best)
        #print("=========================")

        brain.learn_outcome(

            incident=incident,

            playbook=best["candidate_id"],

            recovery_minutes=best["estimated_recovery"],

            business_loss=best["estimated_loss"],

            success=evaluation["success"],

            analyst_rating=evaluation["analyst_rating"],

            notes="Automatic simulation",

            services_saved=best["services_saved"],

            services_lost=max(
                0,
                best["predicted_spread"]
            ),

            blast_before=len(
                best["topology"]["spread"]
            ),

            blast_after=best["predicted_spread"],

            false_positive=False
        )
        

    def _collect_votes(
        self,
        incident,
        forecast,
        strategic,
        experience,
        digital_twin,
        graph_reasoning,
        dna_similarity,
        ueba_result

    ):
        """
        Ask every AI module for its recommendation.
        Every module returns a standard vote.
        The AI Council later combines them.
        """

        incident = self.intelligence.build(
            incident
        )

        strategies = strategic.get(
            "strategies",
            []
        )

        recommended = strategic.get(
            "recommended"
        )

        votes = []
        # -------------------------
        # Enterprise Brain
        # -------------------------
        try:
            votes.append(
                self.brain.vote(
                    incident
                )
            )
        except Exception:
            print("[Council] Enterprise Brain vote failed")
            traceback.print_exc()
        #-------------------------
        # Digital Twin
        #-------------------------
        try:
            votes.append(
                self.digital_twin.vote(
                    incident,
                    digital_twin,
                    strategies
                )
            )
        except Exception as e:
            print(f"[Council] Digital Twin vote failed: {e}")
   
        # -------------------------
        # Predictive Intelligence
        # -------------------------
        try:
            votes.append(
                self.predictive.vote(
                    strategic["recommended"]
                )
            )
        except Exception as e:
            print(f"[Council] Predictive Intelligence vote failed: {e}")

        #-------------------------
        # Graph AI
        #-------------------------
        
        # ----------------------------------------
        # Graph AI evaluates ALL playbook templates
        # ----------------------------------------

        playbooks = self.brain.get_playbook_templates(
            incident
        )


        try:
            votes.append(
                self.graph_vote.vote(
                    incident,
                    strategic["strategies"]
                )
            )
        except Exception as e:

            print(f"[Council] Graph AI vote failed: {e}")


        print("\n===== GRAPH AI =====")
        for pb in playbooks:
            print(pb["id"])
        print("====================\n")

        #-------------------------
        # DNA Vote
        #-------------------------

        try:
            votes.append(
                self.dna_vote.vote(
                    strategic["recommended"]["playbook"],
                    strategic["strategies"]
                )
            )
        except Exception as e:
            print(f"[Council] Cyber DNA vote failed: {e}")

        #-------------------------
        # UEBA Vote
        #-------------------------

        try:
            votes.append(
                self.ueba_vote.vote(
                    incident,
                    strategic["strategies"]
                )
            )
        except Exception as e:
            print(
                f"[Council] UEBA vote failed: {e}"
            )

        # -------------------------
        # Business Vote
        # -------------------------

        try:
            votes.append(
                self.business_vote.vote(
                    forecast["forecast"]["business_impact"],
                    strategic["strategies"]
                )
            )
        except Exception as e:
            print(f"[Council] Business Impact vote failed: {e}")

        # -------------------------
        # Risk Vote
        # -------------------------
        try:
            votes.append(
                self.risk_vote.vote(
                    incident,
                    strategic["strategies"]
                )
            )
        except Exception as e:
            print(f"[Council] Enterprise Risk vote failed: {e}")

        #-------------------------

        print("\n========== AI VOTES ==========\n")
        for vote in votes:
            print(
                f"{vote['agent']:<20}"
                f"{vote['recommendation']:<10}"
                f"{vote['confidence']}%"
            )
        print("\n==============================\n")

        votes = [
            vote
            for vote in votes
            if vote is not None
        ]

        return votes

    def analyze(self, incident):

        incident = self.intelligence.build(
            incident
        )

        incident.setdefault(
            "timestamp",
            datetime.now(UTC).isoformat()
        )


        # -----------------------------------
        # Enterprise Cyber Brain
        # -----------------------------------

        asset = incident["asset"]["hostname"]

        username = incident.get(
            "username",
            "Unknown"
        )

        # Register asset if new

        if not brain.node_exists(asset):

            print(incident["asset_profile"])

            profile = incident["asset_profile"]

            brain.add_asset(

                asset,

                criticality=profile.get("criticality", "Unknown"),

                service=profile.get("service", "Unknown"),

                department=profile.get(

                    "department",

                    profile.get(

                        "business_unit",

                        "Unknown"

                    )

                ),

                owner=profile.get("owner", "Unknown"),

                os=profile.get("os", "Unknown"),

                enterprise_users=profile.get(

                    "enterprise_users",

                    0

                ),

                hourly_cost=profile.get(

                    "hourly_cost",

                    0

                )

            )

        # Register user

        if not brain.node_exists(username):

            brain.add_user(

                username,

                department=incident.get(
                    "department",
                    "Unknown"
                ),

                role=incident.get(
                    "role",
                    "Unknown"
                )

            )

        brain.connect(

            username,

            "LOGGED_INTO",

            asset

        )

        # -----------------------------------
        # Historical Intelligence
        # -----------------------------------

        similar = brain.find_similar(
            incident
        )

        asset_history = brain.attack_history(
            asset
        )

        mitre_history = brain.mitre_history(

            incident["mitre"]["id"]

        )

        user_history = brain.user_history(
            username
        )


        forecast = self.forecast.predict(
            incident
        )

        experience = self.brain.replay_incident(incident)


        decision = self.decision.decide(
            incident,
            forecast

        )

        digital_twin = self.digital_twin.simulate(
            incident
        )

        incident["enterprise_risk"] = \
            forecast["forecast"][
                "enterprise_risk"
            ]["enterprise_score"]
        
        # ---------------------------------------
        # Cyber DNA
        # ---------------------------------------

        dna = self.cyber_dna.build(
            incident
        )

        # ---------------------------------------
        # Enterprise Context
        # ---------------------------------------

        incident["enterprise_context"] = {

            "similar_incident": similar,

            "asset_history": len(asset_history),

            "user_history": len(user_history),

            "mitre_history": len(mitre_history),

            "experience_replay": experience,

        }

        incident["enterprise_context"]["cyber_dna"] = dna

        playbook = self.brain.get_playbook(incident)

        incident["enterprise_context"]["recommended_playbook"] = playbook

        dna_similarity = 0
        previous = similar.get("incident")
        if previous:
            previous_context = previous.get(
                "enterprise_context",
                {}
            )

            previous_dna = previous_context.get(
                "cyber_dna"
            )
            if previous_dna:
                dna_similarity = self.dna_similarity.compare(
                    dna,
                    previous_dna
                )

        # ---------------------------------------
        # UEBA
        # ---------------------------------------

        ueba_result = self.ueba.analyze(
            incident
        )

        incident["enterprise_context"]["ueba"] = ueba_result

        
  
        strategic = self.predictive.evaluate(

            incident,

            forecast["forecast"]["enterprise_risk"],

            forecast["forecast"]["business_impact"],

            digital_twin,

            forecast["forecast"]["time_machine"]

        )

        # ---------------------------------------
        # Graph AI
        # ---------------------------------------

        attack_graph = self.graph_ai.build(

            forecast["forecast"]["time_machine"]["timeline"]

        )

        graph_reasoning = self.graph_reasoner.explain(

            attack_graph

        )

        

        #print("\n===== COUNCIL DEBUG =====")
        #print("Graph AI      :", graph_reasoning is not None)
        #print("DNA Similarity:", dna_similarity)
        #print("UEBA          :", ueba_result)
        #print("=========================\n")

        threat_summary = {

            "incident_id": incident["incident_id"],

            "category": incident["category"],

            "severity": incident["severity"],

            "hostname": incident["asset"]["hostname"],

            "mitre": {

                "id": incident["mitre"]["id"],

                "tactic": incident["mitre"]["tactic"],

                "technique": incident["mitre"]["technique"]

            }

        }

        enterprise_intelligence = self.enterprise_builder.build(

            threat=threat_summary,

            behavior=incident.get(
                "behavior_correlation",
                {}
            ),

            campaign=forecast["forecast"].get(
                "campaign_risk",
                {}
            ),

            ueba=ueba_result,

            cyber_dna={
                "similarity": dna_similarity
            },

            business=forecast["forecast"].get(
                "business_impact",
                {}
            ),

            enterprise=forecast["forecast"].get(
                "enterprise_risk",
                {}
            )

        )

        incident["enterprise_intelligence"] = enterprise_intelligence

        votes = self._collect_votes(
            incident,
            forecast,
            strategic,
            experience,
            digital_twin,
            graph_reasoning,
            dna_similarity,
            ueba_result
        )

        debate = self.debate.debate(votes)

        print()

        print("=" * 70)
        print("AI COUNCIL DEBATE")
        print("=" * 70)
        print()
        for option in debate:
            print(
                f"\nPlaybook : {option['playbook']}"
            )
            print(
                f"Support : {option['support']} agents"
            )

            print(
                f"Average Confidence : "

                f"{option['average_confidence']}%"
            )

            print()

            for supporter in option["supporters"]:
                print(
                    f"• {supporter['agent']}"

                    f" ({supporter['confidence']}%)"
                )

                print(

                    f"  {supporter['reason'][0]}"

                )

                alts = supporter.get(
                    "alternatives",
                    []
                )

                if alts:
                    print("  Alternatives:")
                    for alt in alts:
                        print(
                            f"     "
                            f"{alt['playbook']}"
                            f" ({alt['score']})"
                        )

        print()
        print("=" * 70)
        print()


        council = self.consensus.calculate(votes)

        #print("\n========== STORE OUTCOME ==========")
        #print("About to store outcome...")
        #print("==================================")

        self._store_outcome(
            incident,
            strategic,
            forecast["forecast"]["business_impact"]
        )

        print("Outcome stored successfully.\n")

        best_strategy = strategic["recommended"]

        # temporary
        #print("\n===== BEST STRATEGY =====")
        #print(best_strategy.keys())
        #print("=========================\n")

        updated_time_machine = self.forecast.time_machine.predict(
            incident,
            forecast["forecast"]["enterprise_risk"],
            best_strategy["graph"]
        )

        brain.remember({

            "incident_id": incident["incident_id"],

            "category": incident["category"],

            "severity": incident["severity"],

            "status": incident["status"],

            "created": incident["created"],

            "asset": {

                "hostname": incident["asset"]["hostname"]

            },

            "mitre": incident["mitre"]

        })

        
        # ---------------------------------------
        # Explainable AI
        # ---------------------------------------

        xai = self.xai.explain(
            incident,
            {
                "strategic_analysis": strategic,
                "decision": decision
            },
            votes
        )

        result = {

            # Core AI
            "decision": decision,
            "forecast": forecast,

            "strategic_analysis": strategic,

            # Commander Recommendation
            "recommended_playbook": strategic["recommended"],

            #
            # Enterprise Brain
            #

            "enterprise_context": incident["enterprise_context"],

            "enterprise_intelligence": enterprise_intelligence,

            "experience_replay": experience,

            # AI Modules
            "digital_twin": digital_twin,
            "graph_ai": {
                "graph": attack_graph,
                "analysis": graph_reasoning
            },
            "cyber_dna": {
                "fingerprint": dna,
                "similarity": dna_similarity,
                "score": incident["enterprise_context"]["cyber_dna"]
            },
            "ueba": ueba_result,

            

            # Council
            "ai_council": council,
            "debate": debate,

            # Explainability
            "xai": xai

        }

        print()

        print("=" * 70)
        print("AI COUNCIL")
        print("=" * 70)

        print(
            "Winner        :",
            council["winner"]
        )

        print(
            "Confidence    :",
            council["confidence"],
            "%"
        )

        print(
            "Agreement     :",
            council["agreement"],
            "/",
            len(council["votes"])
        )

        print(
            "Disagreement  :",
            council["disagreement"]
        )

        if council["minority"]:

            print("\nMinority Opinions")

            for item in council["minority"]:

                print(

                    "-",

                    item["agent"],

                    "preferred",

                    item["recommendation"]

                )

        print()

        print("=" * 70)
        print("EXPLAINABLE AI")
        print("=" * 70)

        print()
        print(
            xai["summary"]["summary"]
        )

        print()
        print("Council")
        for line in xai["council"]["reasoning"]:
            print(f"✓ {line}")

        print()
        print("Business")
        for line in xai["business"]["reasoning"]:
            print(f"✓ {line}")
        print()
        print("Attack Graph")
        for line in xai["graph"]["reasoning"]:
            print(f"✓ {line}")

        CommanderRepository.add(result)

        return result
    
        

    def vote(self, incident):
        """
        Commander AI recommendation
        for AI Council.
        """

        commander = incident.get("commander", {})

        recommended = commander.get("recommended_playbook", {})


        recommendation = "Investigate"

        if isinstance(recommended, dict):

            recommendation = (
                recommended.get("candidate_id")
                or recommended.get("base_playbook")
                or "Investigate"
            )

        elif isinstance(recommended, str):

            recommendation = recommended

        return {

            "agent": "Commander",

            "recommendation": recommendation,

            "confidence": commander.get("confidence", 90),

            "weight": 0.20,

            "reason": commander.get(
                "reason",
                ["Commander strategic analysis."]
            ),

            # keep complete analysis separately
            "analysis": recommended,

            "evaluation": commander.get(
                "strategies",
                []
            )

        }