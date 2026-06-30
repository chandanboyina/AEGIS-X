class EvidenceManager:
    """
    Collects investigation evidence.
    """

    def collect(self, packet):

        evidence = [

            "Oracle Investigation Report",

            "Sentinel Response Report",

            "Original Event Log"

        ]

        containment = packet["sentinel"]["containment"]

        if containment["collect_memory"]:

            evidence.append("Memory Dump")

        if containment["collect_disk"]:

            evidence.append("Disk Image")

        return evidence