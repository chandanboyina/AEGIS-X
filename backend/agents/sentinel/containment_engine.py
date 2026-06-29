from agents.sentinel.isolation_engine import IsolationEngine
from agents.sentinel.account_lock_engine import AccountLockEngine
from agents.sentinel.network_block_engine import NetworkBlockEngine


class ContainmentEngine:
    """
    Builds structured containment actions
    for Sentinel AI.
    """

    def __init__(self):

        self.isolation = IsolationEngine()

        self.account_lock = AccountLockEngine()

        self.network = NetworkBlockEngine()

    def contain(self, packet):

        oracle = packet["oracle"]

        category = oracle["category"]

        asset = packet["asset"]["hostname"]

        event = packet["event"]

        # Use real values if available
        source_ip = event.get("source_ip", "UNKNOWN_IP")

        username = event.get("username")

        if not username:
            username = "UNKNOWN_USER"

        containment = {

            "isolate_host": False,

            "lock_account": False,

            "block_ip": False,

            "collect_memory": False,

            "collect_disk": False,

            "disable_shares": False,

        }

        # -----------------------------
        # Reconnaissance
        # -----------------------------
        if category == "Reconnaissance":

            containment["block_ip"] = self.network.block(
                source_ip
            )

        # -----------------------------
        # Credential Access
        # -----------------------------
        elif category == "Credential Access":

            containment["lock_account"] = self.account_lock.lock(
                username
            )

        # -----------------------------
        # Privilege Escalation
        # -----------------------------
        elif category == "Privilege Escalation":

            containment["lock_account"] = self.account_lock.lock(
                username
            )

            containment["collect_memory"] = True

        # -----------------------------
        # Malware
        # -----------------------------
        elif category == "Malware":

            containment["isolate_host"] = self.isolation.isolate(
                asset
            )

            containment["collect_memory"] = True

            containment["collect_disk"] = True

        # -----------------------------
        # Ransomware
        # -----------------------------
        elif category == "Ransomware":

            containment["isolate_host"] = self.isolation.isolate(
                asset
            )

            containment["disable_shares"] = True

            containment["collect_memory"] = True

            containment["collect_disk"] = True

        return containment