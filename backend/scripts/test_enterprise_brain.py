from agents.knowledge_graph.enterprise_brain import EnterpriseCyberBrain

brain = EnterpriseCyberBrain()

# ---------------------------------
# Add Enterprise Knowledge
# ---------------------------------

brain.add_user(

    "finance.admin",

    role="Administrator",

    department="Finance",

    location="Delhi"

)

brain.add_asset(

    "CBSE-VPN-01",

    criticality="High",

    service="Remote Access",

    os="Windows"

)

brain.connect(

    "finance.admin",

    "LOGGED_INTO",

    "CBSE-VPN-01"

)

brain.connect(

    "CBSE-VPN-01",

    "HAS_IOC",

    "Credential Attack"

)

brain.connect(

    "CBSE-VPN-01",

    "USES",

    "VPN Service"

)

# ---------------------------------
# Store Previous Incident
# ---------------------------------

old_incident = {

    "incident_id":"IM-0001",

    "category":"Credential Access",

    "severity":"HIGH",

    "asset":"CBSE-VPN-01",

    "username":"finance.admin",

    "mitre":{"id":"T1110"},

    "ioc_list":[1,2,3]

}

brain.remember(

    old_incident

)

# ---------------------------------
# Current Incident
# ---------------------------------

current = {

    "incident_id":"IM-0002",

    "category":"Credential Access",

    "severity":"HIGH",

    "asset":"CBSE-VPN-01",

    "username":"finance.admin",

    "mitre":{"id":"T1110"},

    "ioc_list":[1,2,3,4]

}

similar = brain.find_similar(

    current

)

print()

print("="*70)

print("ENTERPRISE CYBER BRAIN")

print("="*70)

print()

print(

    "Assets:",

    brain.assets_for_user(

        "finance.admin"

    )

)

print()

print(

    "IOCs:",

    brain.iocs_for_asset(

        "CBSE-VPN-01"

    )

)

print()

print(

    "Services:",

    brain.services_for_asset(

        "CBSE-VPN-01"

    )

)

print()

print("Most Similar Incident")

print("--------------------------------")

print(

    similar["incident"]["incident_id"]

)

print(

    f"Similarity : "

    f"{similar['analysis']['similarity']}%"

)

print()

print("Reasons")

print("--------------------------------")

for reason in similar["analysis"]["reasons"]:

    print(

        f"✓ {reason}"

    )

print()

print("Asset Intelligence")
print("--------------------------------")

print(

    brain.get_asset(

        "CBSE-VPN-01"

    )

)


print()

print("Attack History")
print("--------------------------------")

print(

    len(

        brain.attack_history(

            "CBSE-VPN-01"

        )

    )

)

print()

print("User History")
print("--------------------------------")

print(

    len(

        brain.user_history(

            "finance.admin"

        )

    )

)

print()

print("MITRE History")
print("--------------------------------")

print(

    len(

        brain.mitre_history(

            "T1110"

        )

    )

)

