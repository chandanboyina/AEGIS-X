import hashlib
import random

COMMON_IPS = [

    "203.25.112.45",

    "118.198.130.197",

    "103.212.30.170",

    "91.73.28.6",

    "185.221.99.14"

]

class IOCEnrichment:

    def enrich(self, packet):

        event = packet["event"]

        iocs = []

        # ----------------------------------------
        # Source IP
        # ----------------------------------------

        source_ip = event.get("source_ip")

        if source_ip:

            if random.randint(1, 4) == 1:

                source_ip = random.choice(COMMON_IPS)

            iocs.append({

                "type": "Source IP",

                "value": source_ip,

                "confidence": "High",

                "reputation": "Suspicious"

            })

        # ----------------------------------------
        # Username
        # ----------------------------------------

        username = event.get("username")

        if username:

            iocs.append({

                "type": "Username",

                "value": username,

                "confidence": "High",

                "reputation": "Targeted"

            })

        # ----------------------------------------
        # Process
        # ----------------------------------------

        process = event.get("process")

        if process:

            md5 = hashlib.md5(

                process.encode()

            ).hexdigest()

            sha1 = hashlib.sha1(

                process.encode()

            ).hexdigest()

            sha256 = hashlib.sha256(

                process.encode()

            ).hexdigest()

            iocs.extend([

                {

                    "type": "Process",

                    "value": process,

                    "confidence": "High",

                    "reputation": "Malicious"

                },

                {

                    "type": "MD5",

                    "value": md5,

                    "confidence": "High",

                    "reputation": "Known Malware"

                },

                {

                    "type": "SHA1",

                    "value": sha1,

                    "confidence": "High",

                    "reputation": "Known Malware"

                },

                {

                    "type": "SHA256",

                    "value": sha256,

                    "confidence": "High",

                    "reputation": "Known Malware"

                }

            ])

        # ----------------------------------------
        # Ports
        # ----------------------------------------

        ports = event.get("ports", [])

        for port in ports:

            iocs.append({

                "type": "Port",

                "value": port,

                "confidence": "Medium",

                "reputation": "Scanned"

            })

        # ----------------------------------------
        # Ransomware Extras
        # ----------------------------------------

        if packet["oracle"]["category"] == "Ransomware":

            iocs.extend([

                {

                    "type": "Encrypted Extension",

                    "value": ".locked",

                    "confidence": "High",

                    "reputation": "Ransomware"

                },

                {

                    "type": "Wallet Address",

                    "value": "bc1q-demo-wallet",

                    "confidence": "High",

                    "reputation": "Threat Actor"

                },

                {

                    "type": "Ransom Note",

                    "value": "README_RECOVER.txt",

                    "confidence": "High",

                    "reputation": "Known Ransomware"

                }

            ])

        return iocs