class AttackChainBuilder:
    """
    Builds an attack chain from correlated incidents.
    """

    # Enterprise attack order
    STAGES = {

        "Reconnaissance": 1,

        "Discovery": 2,

        "Credential Access": 3,

        "Privilege Escalation": 4,

        "Execution": 5,

        "Persistence": 6,

        "Defense Evasion": 7,

        "Lateral Movement": 8,

        "Command and Control": 9,

        "Exfiltration": 10,

        "Impact": 11,

        "Unknown": 99,

    }

    def build(self, campaign):

        events = campaign["events"]

        chain = []

        for packet in events:

            oracle = packet["oracle"]

            category = oracle["category"]

            mitre = oracle["mitre"]

            tactic = mitre["tactic"]

            if category == "Normal":

                tactic = "Normal"

                stage = 99

            else:

                stage = self.STAGES.get(
                    tactic,
                    98,
                )

            chain.append({

                "stage": stage,

                "category": category,

                "tactic": tactic,

                "event":
                    packet["event"]["event_type"],

                "asset":
                    packet["asset"]["hostname"],

                "timestamp":
                    packet["event"]["timestamp"],

                "mitre": mitre,

            })

        chain.sort(
            key=lambda x: (
                x["stage"],
                x["timestamp"]
            )
        )

        campaign["attack_chain"] = chain

        return campaign