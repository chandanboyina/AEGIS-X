class PlaybookRanker:
    """
    Shared utility used by all AI agents.

    Each agent scores every available playbook
    using its own metric and returns the best one.
    """

    def rank(self, playbooks, scorer):

        scored = []

        for playbook in playbooks:

            score = scorer(playbook)

            scored.append({

                "playbook": playbook,

                "score": score

            })

        scored.sort(

            key=lambda x: x["score"],

            reverse=True

        )

        return scored