from agents.council.base_decision_agent import BaseDecisionAgent


class PredictiveVote(BaseDecisionAgent):
    """
    Predictive AI

    Selects the playbook strategy that is
    most likely to prevent future attack progression.
    """

    agent = "Predictive"

    objective = "Future Attack Prevention"

    def weights(self):

        return {

            "prediction_confidence":0.40,

            "stage_prevention":0.30,

            "forecast_accuracy":0.20,

            "attack_progress":0.10

        }

    def bias_name(self):

        return "predictive_bias"

    def subscores(
        self,
        candidate,
        incident,
        context
    ):

        graph = context["graph"]

        removed = len(

            graph.get(

                "removed_stages",

                []

            )

        )

        stopped = graph.get(

            "stopped",

            False

        )

        remaining_probability = graph.get(

            "remaining_probability",

            100

        )

        return {

            "prediction_confidence":

                context["confidence"],

            "stage_prevention":

                min(

                    removed * 25,

                    100

                ),

            "forecast_accuracy":

                100 if stopped else 60,

            "attack_progress":

                100 - remaining_probability

        }
    
    def strengths(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Prevents future attack stages",

            "Uses enterprise attack simulation"

        ]
    
    def weaknesses(
        self,
        candidate,
        incident,
        context
    ):

        return [

            "Depends on forecast accuracy"

        ]
    
    def reasoning(
        self,
        candidate,
        incident,
        context,
        objective,
        bias
    ):

        remaining = len(

            context["graph"]["remaining_path"]

        )

        return [

            f"Prediction Score {objective['score']}",

            f"Remaining Attack Stages {remaining}",

            f"Forecast Confidence {context['confidence']}%",

            f"Predictive Bias {bias:+}"

        ]
    
    def evaluate_strategies(
        self,
        incident,
        strategies
    ):
        proposals = []

        for strategy in strategies:

            score_data = self.objective_score(
                strategy,
                incident,
                strategy
            )

            proposal = self.create_proposal(
                strategy,
                incident,
                strategy,
                score_data

            )

            proposals.append(proposal)

        proposals.sort(
            key=lambda p: p.score,
            reverse=True
        )

        return proposals