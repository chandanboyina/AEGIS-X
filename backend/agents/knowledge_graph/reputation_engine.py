from collections import defaultdict


class ReputationEngine:
    """
    Learns long-term playbook reputation.

    Reputation changes after every incident.

    Better outcomes
        -> Higher reputation

    Poor outcomes
        -> Lower reputation
    """

    def __init__(self):

        self.reputation = defaultdict(
            lambda: 50.0
        )

    def update(
        self,
        playbook,
        success,
        recovery,
        loss,
        analyst_rating
    ):

        score = self.reputation[playbook]

        if success:
            score += 3
        else:
            score -= 6

        score += analyst_rating * 0.30
        score -= recovery * 0.05
        score -= loss * 0.25
        score = max(
            0,
            min(
                100,
                round(score, 1)
            )
        )

        self.reputation[playbook] = score

    def score(
        self,
        playbook
    ):

        return self.reputation.get(
            playbook,
            50
        )