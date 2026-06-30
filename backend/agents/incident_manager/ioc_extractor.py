class IOCExtractor:
    """
    Extracts Indicators of Compromise.
    """

    def extract(self, packet):

        event = packet["event"]

        iocs = []

        if event.get("source_ip"):

            iocs.append({

                "type": "Source IP",

                "value": event["source_ip"]

            })

        if event.get("username"):

            iocs.append({

                "type": "Username",

                "value": event["username"]

            })

        if event.get("process"):

            iocs.append({

                "type": "Process",

                "value": event["process"]

            })

        if event.get("ports"):

            for port in event["ports"]:

                iocs.append({

                    "type": "Port",

                    "value": str(port)

                })

        iocs.append({

            "type": "Target Host",

            "value": packet["asset"]["hostname"]

        })

        return iocs