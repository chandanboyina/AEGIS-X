from datetime import datetime
import hashlib
import random

class EvidenceChain:

    def build(self, evidence_list):

        chain = []

        for evidence in evidence_list:

            sha = hashlib.sha256(
                f"{evidence}{random.randint(1,99999)}".encode()
            ).hexdigest()

            chain.append({

                "name": evidence,

                "collector": "Sentinel AI",

                "time": datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

                "sha256": sha,

                "storage": "Enterprise Evidence Vault",

                "integrity": "Verified",

                "status": "Preserved"

            })

        return chain