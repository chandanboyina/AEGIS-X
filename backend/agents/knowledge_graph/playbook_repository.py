import json
from pathlib import Path


class PlaybookRepository:

    def __init__(self):

        root = Path(__file__).resolve().parents[2]

        with open(
            root /
            "data" /
            "playbooks.json",
            encoding="utf-8"
        ) as f:

            self.playbooks = json.load(f)

        with open(
            root /
            "knowledge" /
            "playbooks" /
            "playbook_profiles.json",
            encoding="utf-8"
        ) as f:

            self.profiles = json.load(f)

        

    def candidates(
        self,
        category
    ):

        base = self.playbooks.get(
            category,
            []
        )

        candidates = []

        for pb in base:

            for strategy, profile in self.profiles.items():

                candidates.append(

                    {

                        "candidate_id":
                            f"{pb['id']}-{strategy}",

                        "base_playbook":
                            pb["id"],

                        "strategy":
                            strategy,

                        "playbook":
                            pb,

                        "metrics":
                            profile

                    }

                )

        return candidates
    
    def get(self, playbook_id):
        """
        Return a playbook by its ID.
        """

        for playbooks in self.playbooks.values():

            for playbook in playbooks:

                if playbook["id"] == playbook_id:

                    return playbook

        return None