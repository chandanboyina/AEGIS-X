import json
from pathlib import Path


class VendorLoader:
    """
    Loads vendor security advisories.
    """

    def __init__(self):

        self.database = []

        self.load()

    def load(self):

        base = Path(__file__).resolve().parents[2]

        file = (
            base
            / "knowledge"
            / "vendor"
            / "vendor_advisories.json"
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

        cve=None,

        vendor=None,

        keyword=None

    ):

        results = []

        for item in self.database:

            if mitre and item.get("mitre") == mitre:

                results.append(item)

                continue

            if cve and item.get("cve") == cve:

                results.append(item)

                continue

            if vendor and item.get("vendor") == vendor:

                results.append(item)

                continue

            if keyword:

                text = json.dumps(item).lower()

                if keyword.lower() in text:

                    results.append(item)

        return results