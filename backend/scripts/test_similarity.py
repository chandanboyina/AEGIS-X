from agents.knowledge_graph.similarity_engine import SimilarityEngine

engine = SimilarityEngine()

incident1 = {

    "category":"Credential Access",

    "severity":"HIGH",

    "asset":"CBSE-VPN-01",

    "mitre":{"id":"T1110"},

    "ioc_list":[1,2,3,4]

}

incident2 = {

    "category":"Credential Access",

    "severity":"HIGH",

    "asset":"CBSE-VPN-01",

    "mitre":{"id":"T1110"},

    "ioc_list":[1,2,3]

}

result = engine.compare(

    incident1,

    incident2

)

print()

print("="*60)

print("SIMILARITY ENGINE")

print("="*60)

print()

print(

    f"Similarity : {result['similarity']}%"

)

print()

print("Reasons")

print("--------------------------------")

for reason in result["reasons"]:

    print(f"✓ {reason}")