from agents.rag.cve_loader import CVELoader

loader = CVELoader()

print(

    loader.search(

        mitre="T1003"

    )

)