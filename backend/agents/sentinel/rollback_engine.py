class RollbackEngine:
    """
    Builds rollback actions for Sentinel AI.

    Used when an incident is determined to be a
    false positive or containment must be reversed.
    """

    def build(self, packet):

        containment = packet["sentinel"]["containment"]

        rollback = []

        # -----------------------------
        # Undo Host Isolation
        # -----------------------------
        if containment["isolate_host"]:

            rollback.append({

                "action": "Reconnect Host",

                "target":
                    packet["asset"]["hostname"],

                "status":
                    "PENDING"

            })

        # -----------------------------
        # Undo Account Lock
        # -----------------------------
        if containment["lock_account"]:

            rollback.append({

                "action": "Unlock Account",

                "target":
                    containment["lock_account"]["account"],

                "status":
                    "PENDING"

            })

        # -----------------------------
        # Undo Network Block
        # -----------------------------
        if containment["block_ip"]:

            rollback.append({

                "action": "Remove Firewall Block",

                "target":
                    containment["block_ip"]["ip"],

                "status":
                    "PENDING"

            })

        return rollback