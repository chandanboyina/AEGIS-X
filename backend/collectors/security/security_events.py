SECURITY_EVENTS = {

    4624:{

        "event_name":"Successful Logon",

        "category":"Authentication",

        "severity":"Info",

        "risk_score":5,

        "confidence":100,

        "mitre":{

            "technique":"T1078",

            "tactic":"Initial Access"

        }

    },

    4625:{

        "event_name":"Failed Logon",

        "category":"Credential Access",

        "severity":"Medium",

        "risk_score":45,

        "confidence":95,

        "mitre":{

            "technique":"T1110",

            "tactic":"Credential Access"

        }

    },

    4672:{

        "event_name":"Special Privileges Assigned",

        "category":"Privilege Escalation",

        "severity":"High",

        "risk_score":70,

        "confidence":95,

        "mitre":{

            "technique":"T1068",

            "tactic":"Privilege Escalation"

        }

    },

    4688:{

        "event_name":"Process Created",

        "category":"Execution",

        "severity":"Medium",

        "risk_score":50,

        "confidence":90,

        "mitre":{

            "technique":"T1059",

            "tactic":"Execution"

        }

    },

    4697:{

        "event_name":"Service Installed",

        "category":"Persistence",

        "severity":"High",

        "risk_score":75,

        "confidence":95,

        "mitre":{

            "technique":"T1543",

            "tactic":"Persistence"

        }

    },

    4720:{

        "event_name":"User Created",

        "category":"Persistence",

        "severity":"High",

        "risk_score":80,

        "confidence":95,

        "mitre":{

            "technique":"T1136",

            "tactic":"Persistence"

        }

    },

    4732:{

        "event_name":"Added to Admin Group",

        "category":"Privilege Escalation",

        "severity":"Critical",

        "risk_score":90,

        "confidence":98,

        "mitre":{

            "technique":"T1098",

            "tactic":"Privilege Escalation"

        }

    },

    4740:{

        "event_name":"Account Locked",

        "category":"Credential Access",

        "severity":"Medium",

        "risk_score":60,

        "confidence":95,

        "mitre":{

            "technique":"T1110",

            "tactic":"Credential Access"

        }

    },
    4798:{

        "event_name":"User Group Enumeration",

        "category":"Discovery",

        "severity":"Low",

        "risk_score":25,

        "confidence":90,

        "mitre":{

            "technique":"T1069",

            "tactic":"Discovery"

        }

    },

    4799:{

        "event_name":"Local Group Enumeration",

        "category":"Discovery",

        "severity":"Low",

        "risk_score":25,

        "confidence":90,

        "mitre":{

            "technique":"T1069",

            "tactic":"Discovery"

        }

    },

    4648:{

        "event_name":"Explicit Credentials Used",

        "category":"Credential Access",

        "severity":"High",

        "risk_score":70,

        "confidence":95,

        "mitre":{

            "technique":"T1078",

            "tactic":"Credential Access"

        }

    },

    4768:{

        "event_name":"Kerberos Authentication",

        "category":"Authentication",

        "severity":"Info",

        "risk_score":15,

        "confidence":100,

        "mitre":{

            "technique":"T1558",

            "tactic":"Credential Access"

        }

    },

    4769:{

        "event_name":"Kerberos Service Ticket",

        "category":"Lateral Movement",

        "severity":"Medium",

        "risk_score":40,

        "confidence":95,

        "mitre":{

            "technique":"T1550",

            "tactic":"Lateral Movement"

        }

    },

    4771:{

        "event_name":"Kerberos Failure",

        "category":"Credential Access",

        "severity":"Medium",

        "risk_score":55,

        "confidence":95,

        "mitre":{

            "technique":"T1110",

            "tactic":"Credential Access"

        }

    },

    4776:{

        "event_name":"NTLM Authentication",

        "category":"Authentication",

        "severity":"Info",

        "risk_score":20,

        "confidence":95,

        "mitre":{

            "technique":"T1078",

            "tactic":"Initial Access"

        }

    }

}