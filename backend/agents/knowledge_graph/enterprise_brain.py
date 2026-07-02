import json
from datetime import datetime, UTC
from agents.knowledge_graph.knowledge_graph import EnterpriseKnowledgeGraph
from agents.knowledge_graph.incident_memory import IncidentMemory
from agents.knowledge_graph.similarity_engine import SimilarityEngine
from agents.knowledge_graph.graph_query import GraphQuery
from agents.knowledge_graph.outcome_memory import OutcomeMemory
from agents.commander.playbook_ranker import PlaybookRanker


class EnterpriseCyberBrain:
    """
    Central intelligence layer of AEGIS-X.

    Every AI agent interacts with this class.
    """

    def __init__(self):

        self.graph = EnterpriseKnowledgeGraph()

        self.memory = IncidentMemory()

        self.similarity = SimilarityEngine()

        self.query = GraphQuery(self.graph)

        self.outcomes = OutcomeMemory()

        

        with open("data/playbooks.json", "r") as f: self.playbooks = json.load(f)

        self.ranker = PlaybookRanker()

    # ----------------------------------
    # Memory
    # ----------------------------------

    def remember(
        self,
        incident
    ):

        self.memory.remember(
            incident
        )

    # ----------------------------------
    # Graph
    # ----------------------------------

    def add_asset(
        self,
        asset,
        **attrs
    ):

        self.graph.add_node(
            asset,
            "Asset",
            **attrs
        )

    def add_user(
        self,
        user,
        **attrs
    ):

        self.graph.add_node(
            user,
            "User",
            **attrs
        )

    def connect(
        self,
        source,
        relation,
        target
    ):

        self.graph.add_edge(
            source,
            relation,
            target
        )

    #-----------------------------------
    # Playbooks.JSON
    #-----------------------------------
    def get_playbook(self, incident):

        recommendation = self.recommend_playbook(incident)

        templates = self.playbooks.get(
            incident["category"],
            []
        )

        if recommendation:

            best = recommendation["recommended"]

            for pb in templates:

                if pb["id"] == best["playbook"]:

                    return {

                        "recommended": pb,

                        "history": best,

                        "ranking": recommendation["ranking"],

                        "reason": best["matched_using"]

                    }

        if templates:

            return {

                "recommended": templates[0],

                "history": None,

                "ranking": [],

                "learning_mode": True,

            }

        return {

            "recommended": {

                "id": "PB-000",

                "name": "Generic Incident Response",

                "steps": [

                    "Collect evidence",

                    "Contain affected asset",

                    "Preserve forensic artifacts",

                    "Notify SOC analyst"

                ],

                "actions": {

                    "isolate": [],

                    "protect": [],

                    "block": []
                }
            },
            "history": None,
            "ranking": [],
            "learning_mode": True

        }
        
    def get_playbook_by_id(
        self,
        playbook_id
    ):
        """
        Return the complete playbook template
        using its ID.
        """

        for category in self.playbooks.values():

            for playbook in category:

                if playbook["id"] == playbook_id:

                    return playbook

        return None

    def get_playbook_templates(
        self,
        incident
    ):
        """
        Return every playbook template for the
        incident category.

        No historical ranking is applied.
        """

        category = incident["category"]

        return list(
            self.playbooks.get(
                category,
                []
            )
        )
        print(
            brain.get_playbook_templates(
                incident
            )
        )
    #-----------------------------------
    #Experience
    #-----------------------------------

    def learn_outcome(
        self,
        incident,
        playbook,
        recovery_minutes,
        business_loss,
        success,
        analyst_rating=5,
        notes="",

        # -------- New Enterprise Learning --------

        services_saved=0,
        services_lost=0,
        blast_before=0,
        blast_after=0,
        false_positive=False,
    ):
        
        print("\n========== BRAIN ==========")
        print("learn_outcome() called")
        print("Playbook:", playbook)
        print("===========================\n")

        self.outcomes.learn(

            incident=incident,

            playbook=playbook,

            recovery_minutes=recovery_minutes,

            business_loss=business_loss,

            success=success,

            analyst_rating=analyst_rating,

            notes=notes,

            services_saved=services_saved,

            services_lost=services_lost,

            blast_before=blast_before,

            blast_after=blast_after,

            false_positive=false_positive,

        )

    def recommend_playbook(self, incident):

        return self.outcomes.best_playbook(
            incident
        )

    # ----------------------------------
    # Query API
    # ----------------------------------

    def assets_for_user(
        self,
        user
    ):

        return self.query.assets_for_user(
            user
        )

    def iocs_for_asset(
        self,
        asset
    ):

        return self.query.iocs_for_asset(
            asset
        )

    def services_for_asset(
        self,
        asset
    ):

        return self.query.services_for_asset(
            asset
        )

    # ----------------------------------
    # Node API
    # ----------------------------------

    def get_node(self, node):

        return self.graph.get_node(node)

    def node_exists(self, node):

        return node in self.graph.nodes
    
    # ----------------------------------
    # Asset Intelligence
    # ----------------------------------

    def get_asset(self, asset):

        return self.graph.get_node(asset)
    
    # ----------------------------------
    # Historical Intelligence
    # ----------------------------------

    def attack_history(self, asset):

        return self.memory.incidents_for_asset(asset)
    
    # ----------------------------------
    # User Intelligence
    # ----------------------------------

    def user_history(self, username):

        return self.memory.incidents_for_user(username)
    
    # ----------------------------------
    # MITRE Intelligence
    # ----------------------------------

    def mitre_history(self, technique):

        return self.memory.incidents_for_mitre(
            technique
        )

    # ----------------------------------
    # AI Reasoning
    # ----------------------------------

    def find_similar(self,incident):
        """
        Find the most similar historical incident.

        Returns a default response if no history exists.
        """

        best = None

        best_score = -1

        for previous in self.memory.all():

            # Don't compare the incident with itself
            if previous.get("incident_id") == incident.get("incident_id"):
                continue

            result = self.similarity.compare(
                incident,
                previous
            )

            if result["similarity"] > best_score:

                best_score = result["similarity"]

                best = {

                    "incident": previous,

                    "analysis": result

                }

        # -----------------------------------------
        # No historical incidents available
        # -----------------------------------------

        if best is None:

            return {

                "incident": None,

                "analysis": {

                    "similarity": 0,

                    "reasons": [

                        "No historical incidents available."

                    ]

                }

            }

        return best
    
    def replay_incident(
        self,
        incident
    ):

        return self.outcomes.replay(
            incident
        )
    
    def vote(self, incident):
        """
        Enterprise Brain AI Vote

        Uses historical knowledge instead of
        fixed confidence values.
        """

        playbook = self.get_playbook(incident)

        timestamp = incident.get(
            "timestamp",
            datetime.now(UTC).isoformat()
        )

        # ---------------------------------
        # No playbook available
        # ---------------------------------

        if playbook is None:

            return {

                "agent": "Enterprise Brain",

                "recommendation": "None",

                "confidence": 0,

                "weight": 0.30,

                "reason": [

                    "No suitable playbook found."

                ],

                "evidence": {},

                "timestamp": timestamp

            }

        recommendation = playbook["recommended"]

        history = playbook.get("history")

        # ---------------------------------
        # Learning Mode
        # ---------------------------------

        if history is None:

            confidence = 35

            return {

                "agent": "Enterprise Brain",

                "recommendation": recommendation["id"],

                "confidence": confidence,

                "weight": 0.30,

                "reason": [

                    "No historical incidents available.",

                    "Using knowledge-base playbook.",

                    "Confidence reduced because the system has no previous observations."

                ],

                "evidence": {

                    "overall_score": 0,

                    "success_rate": 0,

                    "observations": 0,

                    "matched_using": "Learning Mode"

                },

                "timestamp": timestamp

            }

        # ---------------------------------
        # Historical Intelligence
        # ---------------------------------

        success = history["success_rate"]

        observations = history["observations"]

        reputation = history["reputation"]

        analyst = history["average_analyst_rating"] * 20

        overall = history["overall_score"]

        confidence = round(

            success * 0.30 +

            reputation * 0.20 +

            analyst * 0.15 +

            overall * 0.20 +

            min(
                observations * 5,
                15
            )

        )

        confidence = max(
            35,
            min(
                confidence,
                99
            )
        )

        reasoning = list(
            history["reasoning"]
        )

        reasoning.append(

            f"Historical confidence computed from {observations} previous incidents."

        )

        reasoning.append(

            f"Playbook reputation {reputation}/100."

        )

        reasoning.append(

            f"Analyst rating {history['average_analyst_rating']}/5."

        )

        return {

            "agent": "Enterprise Brain",

            "recommendation": recommendation["id"],

            "confidence": confidence,

            "weight": 0.30,

            "reason": reasoning,

            "evidence": {

                "overall_score": overall,

                "success_rate": success,

                "observations": observations,

                "reputation": reputation,

                "analyst_rating": history["average_analyst_rating"],

                "matched_using": history["matched_using"]

            },

            "timestamp": timestamp

        }
    
    def score_playbook(
        self,
        playbook,
        incident
    ):

        history = self.get_playbook_history(
            playbook["id"]
        )

        if history is None:
            return 50
        return history.get(
            "confidence",
            50
        )