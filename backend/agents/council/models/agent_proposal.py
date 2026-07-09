from dataclasses import dataclass, field


@dataclass
class AgentProposal:
    """
    Standard proposal returned
    by every AI agent.

    This becomes the universal
    language of the AI Council.
    """

    agent: str

    playbook: str

    score: int

    confidence: int

    objective: str

    strengths: list = field(default_factory=list)

    weaknesses: list = field(default_factory=list)

    evidence: dict = field(default_factory=dict)

    reasoning: list = field(default_factory=list)