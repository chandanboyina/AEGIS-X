class FirewallParser:

    def parse(self, log):

        log["source"] = "Firewall"

        return log