from agents.rag.cisa_loader import CISALoader

loader = CISALoader()

print(

    loader.search(

        mitre="T1003"

    )

)