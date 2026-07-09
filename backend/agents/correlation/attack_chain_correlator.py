from collections import defaultdict


class AttackChainCorrelator:
    """
    Enterprise Attack Chain Correlator.

    Groups telemetry into attack chains
    by host, user and attack timeline.
    """

    def correlate(self, events):

        chains = defaultdict(list)

        #
        # Group by Host
        #

        for event in events:

            host = (
                event["event"]
                .get("hostname")
                or event["event"].get("asset")
                or "Unknown"
            )

            chains[host].append(event)

        incidents = []

        #
        # Build Incident
        #

        for host, chain in chains.items():

            chain = sorted(

                chain,

                key=lambda x:
                    x["event"].get("timestamp", "")
            )

            incidents.append(

                self.build_incident(

                    host,

                    chain

                )

            )

        return incidents

    def build_incident(
        self,
        host,
        chain
    ):

        attack_path = []

        risk = 0

        confidence = 0

        mitre = []

        categories = []

        for event in chain:

            attack_path.append(

                event["source"]

            )

            risk += event["risk"]

            confidence += event["event"].get(

                "confidence",

                50

            )

            technique = (
                event["event"]
                .get("mitre", {})
                .get("technique")
            )

            if technique:

                mitre.append(

                    technique

                )

            categories.append(

                event["category"]

            )

        risk = round(

            risk / len(chain)

        )

        confidence = round(

            confidence / len(chain)

        )

        return {

            "host": host,

            "events": len(chain),

            "attack_chain": attack_path,

            "categories": categories,

            "risk": risk,

            "confidence": confidence,

            "mitre": list(

                dict.fromkeys(mitre)

            )
        }