from agents.knowledge_graph.playbook_repository import PlaybookRepository

class PlaybookEngine:
    """
    Maps Oracle threat categories
    to enterprise response playbooks.
    """

    #PLAYBOOKS = {

    #    "Reconnaissance": {
    #        "name": "Reconnaissance Response",
    #        "actions": [
    #            "Increase monitoring",
    #            "Block scanning IP",
    #            "Collect network evidence",
    #        ],
    #    },

    #    "Credential Access": {
    #        "name": "Credential Protection",
    #        "actions": [
    #            "Lock affected account",
    #            "Reset credentials",
    #            "Enable MFA",
    #        ],
    #    },

    #    "Privilege Escalation": {
    #        "name": "Privilege Containment",
    #        "actions": [
    #            "Disable privileged account",
    #            "Audit administrator activity",
    #            "Collect forensic evidence",
    #        ],
    #    },

    #    "Malware": {
    #        "name": "Malware Containment",
    #        "actions": [
    #            "Isolate endpoint",
    #            "Terminate malicious process",
    #            "Collect malware sample",
    #        ],
    #    },

    #    "Ransomware": {
    #        "name": "Ransomware Emergency",
    #        "actions": [
    #            "Disconnect host",
    #            "Disable file shares",
    #            "Start incident response",
    #            "Restore backups",
    #        ],
    #    },

    #    "Normal": {
    #        "name": "Monitoring",
    #        "actions": [
    #            "Continue monitoring",
    #        ],
    #    },
    #}

    def __init__(self):
        self.repo = PlaybookRepository()

    def get_playbook(self, category):

        candidates = self.repo.candidates(category)

        if not candidates:

            return {

                "id": "PB-000",

                "name": "Unknown",

                "actions": []

            }

        #
        # Sentinel always uses
        # the default/base playbook
        #

        return candidates[0]["playbook"]