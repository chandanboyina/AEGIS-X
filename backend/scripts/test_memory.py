from agents.knowledge_graph.incident_memory import IncidentMemory

memory = IncidentMemory()

incident1 = {

    "incident_id":"IM-0001",

    "asset":"CBSE-VPN-01",

    "username":"finance.admin",

    "mitre":{

        "id":"T1110"

    }

}

incident2 = {

    "incident_id":"IM-0002",

    "asset":"CBSE-VPN-01",

    "username":"finance.admin",

    "mitre":{

        "id":"T1110"

    }

}

incident3 = {

    "incident_id":"IM-0003",

    "asset":"CBSE-DB-01",

    "username":"database.admin",

    "mitre":{

        "id":"T1059"

    }

}

memory.remember(incident1)

memory.remember(incident2)

memory.remember(incident3)

print()

print("="*60)

print("ENTERPRISE CYBER BRAIN MEMORY")

print("="*60)

print()

print("VPN History")

print(

    len(

        memory.incidents_for_asset(

            "CBSE-VPN-01"

        )

    )

)

print()

print("finance.admin")

print(

    len(

        memory.incidents_for_user(

            "finance.admin"

        )

    )

)

print()

print("MITRE T1110")

print(

    len(

        memory.incidents_for_mitre(

            "T1110"

        )

    )

)