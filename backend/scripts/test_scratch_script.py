from agents.rag.rag_engine import RAGEngine

rag = RAGEngine()

incident = {

    "category": "Credential Dumping",

    "mitre": {

        "id": "T1003"

    },

    "asset": "Database"

}

print(

    rag.analyze(

        incident,

        "PB-015"

    )

)

