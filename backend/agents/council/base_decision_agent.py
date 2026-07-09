from abc import ABC, abstractmethod

from agents.council.models.agent_proposal import AgentProposal
from agents.council.scoring.objective_score import ObjectiveScore
from agents.knowledge_graph.playbook_repository import PlaybookRepository


class BaseDecisionAgent(ABC):
    """
    Base class for every AI specialist.

    Each AI only implements:

    • objective
    • weights
    • subscores()
    • bias_name()

    Everything else is shared.
    """

    agent = "Unknown"

    objective = "Unknown"

    @abstractmethod
    def subscores(
        self,
        candidate,
        incident,
        context
    ):
        pass

    @abstractmethod
    def weights(self):
        pass

    @abstractmethod
    def bias_name(self):
        pass

    @abstractmethod
    def subscores(
        self,
        candidate,
        incident,
        context
    ):
        pass


    def strengths(
        self,
        candidate,
        incident,
        context
    ):

        return []


    def weaknesses(
        self,
        candidate,
        incident,
        context
    ):

        return []


    def reasoning(
        self,
        candidate,
        incident,
        context,
        objective,
        bias
    ):

        return [

            f"Objective Score {objective['score']}",

            f"{self.bias_name()} {bias:+}"

        ]

    def evaluate(
        self,
        incident,
        context=None
    ):

        repo = PlaybookRepository()

        candidates = repo.candidates(
            incident["category"]
        )

        proposals = []

        for candidate in candidates:

            score_data = self.objective_score(

                candidate,

                incident,

                context

            )

            proposals.append(

                self.create_proposal(

                    candidate,

                    incident,

                    context,

                    score_data

                )

            )

        proposals.sort(

            key=lambda x:x.score,

            reverse=True

        )

        return proposals
    
    def objective_score(
        self,
        candidate,
        incident,
        context
    ):
        """
        Computes the weighted objective score
        using the AI-specific subscores.
        """

        subscores = self.subscores(

            candidate,

            incident,

            context

        )

        result = ObjectiveScore.calculate(

            subscores,

            self.weights()

        )

        bias = candidate["metrics"].get(

            self.bias_name(),

            0

        )

        final = max(

            0,

            min(

                result["score"] + bias,

                100

            )

        )

        return {

            "score": round(final),

            "bias": bias,

            "objective": result

        }
    
    def create_proposal(
        self,
        candidate,
        incident,
        context,
        score_data
    ):
        """
        Creates a standardized AgentProposal.
        """

        return AgentProposal(

            agent=self.agent,

            playbook=candidate["candidate_id"],

            score=score_data["score"],

            confidence=min(

                score_data["score"],

                95

            ),

            objective=self.objective,

            strengths=self.strengths(

                candidate,

                incident,

                context

            ),

            weaknesses=self.weaknesses(

                candidate,

                incident,

                context

            ),

            evidence={

                "strategy": candidate["strategy"],

                "metrics": candidate["metrics"],

                "objective": score_data["objective"]

            },

            reasoning=self.reasoning(

                candidate,

                incident,

                context,

                score_data["objective"],

                score_data["bias"]

            )

        )