from agents.rag.vendor_loader import VendorLoader

loader = VendorLoader()

print(

    loader.search(

        mitre="T1003"

    )

)