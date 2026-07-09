MITRE_MAP = {

    4625: {
        "technique": "T1110",
        "tactic": "Credential Access"
    },

    4688: {
        "technique": "T1059",
        "tactic": "Execution"
    },

    4698: {
        "technique": "T1053",
        "tactic": "Persistence"
    },

    4728: {
        "technique": "T1098",
        "tactic": "Privilege Escalation"
    },

    5140: {
        "technique": "T1021",
        "tactic": "Lateral Movement"
    }

}


class MitreMapper:

    def map(self, event_id):

        return MITRE_MAP.get(

            event_id,

            {

                "technique": "Unknown",

                "tactic": "Unknown"

            }

        )