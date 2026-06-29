class NetworkBlockEngine:
    """
    Simulates enterprise firewall blocking.
    """

    def block(self, ip):

        return {

            "ip": ip,

            "action": "Block IP",

            "status": "SUCCESS",

            "message": f"Firewall rule created for {ip}."

        }