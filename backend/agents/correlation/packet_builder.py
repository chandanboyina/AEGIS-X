class PacketBuilder:
    """
    Enterprise Packet Builder.

    Converts attack chains into the
    enterprise packet expected by
    IncidentManager.
    """

    def build(self, chain):

        priority = self.priority(chain["risk"])

        #
        # Build enterprise event
        #

        incident_event = {}

        if chain["normalized_events"]:

            wrapper = chain["normalized_events"][0]

            #
            # Get the real normalized event
            #

            incident_event = wrapper["event"].copy()

            #
            # Add wrapper information
            #

            incident_event["collector"] = wrapper["source"]

            incident_event["risk"] = wrapper["risk"]

            incident_event["severity"] = wrapper["severity"]

            #
            # Compatibility fields for Incident Manager
            #

            incident_event["event_type"] = incident_event.get(

                "event_name",

                incident_event.get("event")

            )

            incident_event["username"] = (

                incident_event.get("user")

                or incident_event.get("username")

            )

            incident_event["source_ip"] = (

                incident_event.get("source_ip")

                or incident_event.get("ip")

            )

            incident_event["process"] = (

                incident_event.get("process")

                or incident_event.get("image")

                or incident_event.get("command")

                or incident_event.get("command_line")

                or incident_event.get("event_name")

            )

            incident_event["ports"] = []

            incident_event["hostname"] = incident_event.get(

                "hostname",

                chain["host"]

            )

        packet = {

            #
            # Asset
            #
            "asset": {

                "hostname": chain["host"],

                "ip": None,

                "domain": None,

                "os": "Windows",

                "criticality": "Medium"

            },

            #
            # Observer AI
            #
            "observer": {

                "confidence": chain["confidence"],

                "risk_score": chain["risk"],

                "summary": "Telemetry correlated successfully."

            },

            #
            # Sentinel AI
            #
            "sentinel": {

                "priority": priority,

                "risk": chain["risk"],

                "action": self.default_action(priority),

                "reason": self.default_reason(chain),

                "status": "Ready",

                "containment": {

                    "required": priority in ["Critical", "High"],

                    "status": "Pending",

                    "collect_memory": priority in ["Critical", "High"],

                    "collect_disk": priority == "Critical",

                    "isolate_host": priority in ["Critical", "High"]

                },

                "remediation": {

                    "status": "Pending",

                    "playbook": "Enterprise Investigation"

                },

                "detection": {

                    "confidence": chain["confidence"],

                    "source": "AttackChainBuilder"

                },

                "response": {

                    "automated": False,

                    "analyst_required": True

                }

            },

            #
            # Enterprise Event
            #

            "event": incident_event,

            #
            # Oracle AI
            #
            "oracle": {

                "category": (

                    chain["categories"][0]

                    if chain["categories"]

                    else "Unknown"

                ),

                "confidence": chain["confidence"],

                "summary": "Attack chain generated."

            },

            #
            # Telemetry
            #
            "telemetry": {

                "attack_chain": chain["attack_chain"],

                "mitre": chain["mitre"],

                "events": chain["events"]

            }

        }

        return packet

    def priority(self, risk):

        if risk >= 90:
            return "Critical"

        if risk >= 70:
            return "High"

        if risk >= 40:
            return "Medium"

        return "Low"

    def default_action(self, priority):

        actions = {

            "Critical": "Isolate Endpoint",

            "High": "Block Process",

            "Medium": "Investigate",

            "Low": "Monitor"

        }

        return actions[priority]

    def default_reason(self, chain):

        return (

            f"{chain['categories'][0]} activity detected "
            f"with risk score {chain['risk']}."

        )