from agents.rag.certin_loader import CERTINLoader

loader = CERTINLoader()

print(
    loader.search(
        mitre="T1003"
    )
)