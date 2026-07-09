import json
from pathlib import Path


class CVELoader:
    """
    Loads CVE intelligence.
    """

    def __init__(self):

        self.database = []

        self.load()

    def load(self):

        base = Path(__file__).resolve().parents[2]

        file = (
            base
            / "knowledge"
            / "cve"
            / "cve_database.json"
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

        mitre=None,

        keyword=None

    ):

        results = []

        for item in self.database:

            if mitre:

                if item["mitre"] == mitre:

                    results.append(item)

                    continue

            if keyword:

                text = json.dumps(item).lower()

                if keyword.lower() in text:

                    results.append(item)

        return results