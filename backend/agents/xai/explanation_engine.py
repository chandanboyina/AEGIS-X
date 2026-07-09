from agents.xai.council_explainer import CouncilExplainer
from agents.xai.playbook_explainer import PlaybookExplainer
from agents.xai.graph_explainer import GraphExplainer
from agents.xai.business_explainer import BusinessExplainer
from agents.xai.report_generator import ReportGenerator
from agents.xai.observer_explainer import ObserverExplainer
from agents.xai.ueba_explainer import UEBAExplainer
from agents.xai.oracle_explainer import OracleExplainer
from agents.xai.correlation_explainer import CorrelationExplainer
from agents.xai.brain_explainer import BrainExplainer
from agents.xai.dna_explainer import DNAExplainer
from agents.xai.twin_explainer import TwinExplainer
from agents.xai.sentinel_explainer import SentinelExplainer
from agents.xai.mitre_explainer import MitreExplainer
from agents.xai.risk_explainer import RiskExplainer
from agents.xai.prediction_explainer import PredictionExplainer


class ExplanationEngine:
    """
    Enterprise Explainable AI Engine.

    Combines explanations produced by all
    intelligent modules into one coherent report.
    """

    def __init__(self):

        self.council = CouncilExplainer()

        self.playbook = PlaybookExplainer()

        self.graph = GraphExplainer()

        self.business = BusinessExplainer()

        self.report = ReportGenerator()

        self.observer = ObserverExplainer()
        self.ueba = UEBAExplainer()

        self.oracle = OracleExplainer()

        self.correlation = CorrelationExplainer()

        self.brain = BrainExplainer()

        self.dna = DNAExplainer()

        self.twin = TwinExplainer()

        self.sentinel = SentinelExplainer()

        self.mitre = MitreExplainer()

        self.risk = RiskExplainer()
        
        self.prediction = PredictionExplainer()

    def explain(
        self,
        incident,
        commander,
        votes
    ):

        explanation = {

            "observer": self.observer.explain(incident),

            "behavior": self.ueba.explain(incident),

            "correlation": self.correlation.explain(incident),

            "brain": self.brain.explain(incident),

            "cyber_dna": self.dna.explain(incident),

            "digital_twin": self.twin.explain(incident),

            "oracle": self.oracle.explain(incident),

            "mitre": self.mitre.explain(incident),

            "sentinel": self.sentinel.explain(incident),

            "playbook": self.playbook.explain(commander),

            "prediction": self.prediction.explain(commander),

            "business": self.business.explain(commander),

            "graph": self.graph.explain(commander),

            "risk": self.risk.explain(commander),

            "council": self.council.explain(votes)

        }

        explanation["summary"] = self.report.generate(
            incident,
            explanation
        )

        return explanation