import json
from pathlib import Path


class MITRELoader:
    """
    Loads MITRE ATT&CK knowledge.

    Later this class can download updates
    automatically from MITRE.
    """

    def __init__(self):

        self.database = []

        self.load()

    def load(self):

        BASE_DIR = Path(__file__).resolve().parents[2]

        file = (
            BASE_DIR
            / "knowledge"
            / "mitre"
            / "mitre_attack.json"
        )

        if not file.exists():

            self.database = []

            return

        with open(
            file,
            "r",
            encoding="utf-8"
        ) as f:

            self.database = json.load(f)

    def search(
        self,
        technique_id=None,
        keyword=None
    ):

        results = []

        for item in self.database:

            if technique_id:

                if item.get("id") == technique_id:

                    results.append(item)

                    continue

            if keyword:

                text = json.dumps(item).lower()

                if keyword.lower() in text:

                    results.append(item)

        return results