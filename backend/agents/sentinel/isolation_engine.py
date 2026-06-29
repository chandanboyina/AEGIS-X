class IsolationEngine:
    """
    Simulates enterprise endpoint isolation.
    """

    def isolate(self, hostname):

        return {

            "asset": hostname,

            "action": "Isolate Endpoint",

            "status": "SUCCESS",

            "message": f"{hostname} has been isolated from the enterprise network."

        }