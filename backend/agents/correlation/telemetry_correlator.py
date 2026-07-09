class TelemetryCorrelator:
    """
    Enterprise Telemetry Correlation Engine.

    Correlates events coming from multiple
    telemetry sources.
    """

    def correlate(self, telemetry):

        incidents = []

        #
        # Windows Telemetry
        #

        windows = telemetry.get("windows", {})

        #
        # Defender
        #

        for event in windows.get("defender", []):

            incidents.append({

                "source":"Defender",

                "category":event["category"],

                "severity":event["severity"],

                "risk":event["risk_score"],

                "event":event

            })

        #
        # PowerShell
        #

        for event in windows.get("powershell", []):

            incidents.append({

                "source":"PowerShell",

                "category":event["category"],

                "severity":event["severity"],

                "risk":event["risk_score"],

                "event":event

            })

        #
        # DNS
        #

        for event in windows.get("dns", []):

            incidents.append({

                "source":"DNS",

                "category":event["category"],

                "severity":event["severity"],

                "risk":event["risk_score"],

                "event":event

            })

        #
        # Security
        #

        for event in windows.get("security", []):

            incidents.append({

                "source":"Security",

                "category":event["category"],

                "severity":event["severity"],

                "risk":event["risk_score"],

                "event":event

            })

        #
        # Sysmon
        #

        for event in windows.get("sysmon", []):

            incidents.append({

                "source":"Sysmon",

                "category":event["category"],

                "severity":event["severity"],

                "risk":event["risk_score"],

                "event":event

            })

        return incidents