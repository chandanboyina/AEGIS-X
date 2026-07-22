import json
from datetime import datetime, UTC
from agents.knowledge_graph.knowledge_graph import EnterpriseKnowledgeGraph
from agents.knowledge_graph.incident_memory import IncidentMemory
from agents.knowledge_graph.similarity_engine import SimilarityEngine
from agents.knowledge_graph.graph_query import GraphQuery
from agents.knowledge_graph.outcome_memory import OutcomeMemory
from agents.commander.playbook_ranker import PlaybookRanker
from agents.rag.rag_engine import RAGEngine
from agents.rag.intelligence_score import IntelligenceScore
from agents.correlation.threat_correlation import ThreatCorrelation
from agents.council.models.agent_proposal import AgentProposal
from agents.knowledge_graph.playbook_repository import PlaybookRepository




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

        self.intelligence_score = IntelligenceScore()    

        with open("data/playbooks.json", "r") as f: self.playbooks = json.load(f)

        self.ranker = PlaybookRanker()

        self.rag = RAGEngine()

        self.correlation = ThreatCorrelation()

        self.repo=PlaybookRepository()



        

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

        repo = PlaybookRepository()

        templates = repo.candidates(
            incident["category"]
        )

        if recommendation:

            best = recommendation["recommended"]

            for pb in templates:

                if pb["base_playbook"] == best["playbook"]:

                    rag = self.rag.analyze(
                        incident,
                        pb["base_playbook"]
                    )

                    correlation = incident.get(
                        "intelligence",
                        {}
                    ).get(
                        "threat",
                        {
                            "score":0,
                            "intelligence":{}
                        }
                    )

                    intel_score = self.intelligence_score.score(
                        pb["playbook"],
                        rag
                    )

                    intel_score += int(
                        correlation["score"] * 0.20
                    )

                    intel_score = min(
                        intel_score,
                        100
                    )

                    return {

                        "recommended": pb,

                        "history": best,

                        "ranking": recommendation["ranking"],

                        "reason": best["matched_using"],

                        "intelligence": rag,

                        "correlation": correlation,

                        "intelligence_score": intel_score,

                    }

        if templates:

            rag = self.rag.analyze(
                incident,
                templates[0]["playbook"]["id"]
            )

            intel_score = self.intelligence_score.score(
                templates[0]["playbook"],
                rag
            )

            correlation = incident.get(
                "intelligence",
                {}
            ).get(
                "threat",
                {
                    "score":0,
                    "intelligence":{}
                }
            )

            return {

                "recommended": templates[0],

                "history": None,

                "ranking": [],

                "learning_mode": True,

                "intelligence": rag,

                "correlation": correlation,

                "intelligence_score": intel_score,

            }
        
        generic = {

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
        }

        rag = self.rag.analyze(
            incident,
            generic["id"]
        )

        correlation = incident.get(
                "intelligence",
                {}
            ).get(
                "threat",
                {
                    "score":0,
                    "intelligence":{}
                }
            )

        intel_score = self.intelligence_score.score(
            generic,
            rag
        )

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
            "learning_mode": True,
            "intelligence": rag,
            "correlation": correlation,
            "intelligence_score": intel_score,

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
        
        #print(
        #    brain.get_playbook_templates(
        #        incident
        #    )
        #)
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
        
        #print("\n========== BRAIN ==========")
        #print("learn_outcome() called")
        #print("Playbook:", playbook)
        #print("===========================\n")

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

                    "incident": {

                        "incident_id": previous.get("incident_id"),

                        "category": previous.get("category"),

                        "severity": previous.get("severity"),

                        "status": previous.get("status"),

                        "asset": {

                            "hostname":

                                previous.get(
                                    "asset",
                                    {}
                                ).get(
                                    "hostname"
                                )

                        },

                        "created": previous.get("created")

                    },

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
    

    def evaluate(
        self,
        incident
    ):
        """
        Evaluate every candidate playbook and
        return AgentProposal objects.
        """

        repo=PlaybookRepository()

        templates = repo.candidates(
            incident["category"]
        )

        recommendation = self.recommend_playbook(
            incident
        )

        historical = {}

        if recommendation:

            for item in recommendation.get(
                "ranking",
                []
            ):

                playbook = item["playbook"]

                if isinstance(playbook, dict):
                    playbook = playbook["id"]

                historical[playbook] = item

        proposals = []

        for pb in templates:

            history = historical.get(pb["base_playbook"])

            metrics = pb["metrics"]

            if history:

                historical_score = round(
                    history["overall_score"]
                )

                score = round(
                    historical_score * 0.60 +
                    metrics["historical_success"] * 0.40
                )

                confidence = score
                reasoning = list(
                    history.get(
                        "reasoning",
                        [
                            "No historical reasoning available."
                        ]
                    )
                )

                reasoning.append(

                    f"Strategy: {pb['strategy']}"

                )

                objective = "Historical Success"

            else:

                score = round(

                    metrics["historical_success"] * 0.80

                )

                confidence = score

                reasoning = [

                    "No historical evidence available.",

                    f"Using {pb['strategy']} strategy profile."

                ]

                objective = "Learning Mode"

            proposals.append(

                AgentProposal(

                    agent="Enterprise Brain",

                    playbook=pb["candidate_id"],

                    score=score,

                    confidence=confidence,

                    objective=objective,

                    strengths=[

                        "Historical learning"

                    ],

                    weaknesses=[],

                    evidence=history or {},

                    reasoning=reasoning

                )

            )

        proposals.sort(

            key=lambda x: x.score,

            reverse=True

        )

        return proposals
    
    def vote(self, incident):
        """
        Enterprise Brain AI Vote

        Uses historical knowledge instead of
        fixed confidence values.
        """

        proposals = self.evaluate(
            incident
        )

        if not proposals:

            return {

                "agent": "Enterprise Brain",

                "recommendation": "None",

                "confidence": 0,

                "weight": 0.30,

                "reason": [

                    "No playbook proposals available."

                ],

                "evidence": {},

                "timestamp": incident.get("timestamp")

            }

        best = proposals[0]

        playbook = self.get_playbook(
            incident
        )

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

                "recommendation": recommendation["candidate_id"],

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

        # ---------------------------------
        # Intelligence Adjustment
        # ---------------------------------

        intel_score = playbook.get(
            "intelligence_score",
            0
        )

        correlation = playbook.get(
            "correlation",
            {}
        )

        correlation_score = correlation.get(
            "score",
            0
        )

        # Blend historical confidence with
        # live intelligence.

        confidence = round(

            confidence * 0.75 +

            intel_score * 0.15 +

            correlation_score * 0.10

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

        reasoning.append(

            f"Threat correlation score {correlation_score}/100."

        )

        reasoning.append(

            f"Threat intelligence score {intel_score}/100."

        )

        return {

            "agent": "Enterprise Brain",

            "recommendation": recommendation["candidate_id"],

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

            "timestamp": timestamp,

            "evaluation": proposals,

            "proposal": best,

            "alternatives": proposals[1:4],

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