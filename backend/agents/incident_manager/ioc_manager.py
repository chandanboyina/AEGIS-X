from datetime import datetime, timedelta
import random


class IOCManager:
    """
    Enterprise IOC Management Engine.
    """

    # ----------------------------------------
    # Central IOC Repository
    # ----------------------------------------

    repository = []

    # ----------------------------------------
    # IOC Generators
    # ----------------------------------------

    domains = [

        "login.microsoft-support.com",

        "secure-office365.net",

        "onedrive-share.net",

        "mail-security.co",

        "update-windows.org"

    ]

    urls = [

        "https://login.microsoft-support.com/update",

        "https://secure-office365.net/auth",

        "https://onedrive-share.net/document",

        "https://mail-security.co/login",

        "https://update-windows.org/download"

    ]

    registry_paths = [

        r"HKLM\Software\Microsoft\Windows\CurrentVersion\Run",

        r"HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce",

        r"HKLM\System\CurrentControlSet\Services",

        r"HKCU\Software\Classes",

        r"HKLM\Security"

    ]

    # ----------------------------------------
    # Add IOC to Repository
    # ----------------------------------------

    def add(self, ioc):

        now = datetime.now()

        now_str = now.strftime("%Y-%m-%d %H:%M:%S")

        for existing in IOCManager.repository:

            if (

                existing["type"] == ioc["type"]

                and

                existing["value"] == ioc["value"]

            ):

                # Simulate IOC being seen again later
                last_seen = now + timedelta(
                    seconds=random.randint(30, 300)
                )

                existing["last_seen"] = last_seen.strftime(
                    "%Y-%m-%d %H:%M:%S"
                )

                existing["incidents"] += 1

                return

        # ----------------------------------------
        # Determine IOC Risk
        # ----------------------------------------

        risk = "🟢 Low"

        if ioc["type"] in [

            "MD5",

            "SHA1",

            "SHA256",

            "Wallet Address",

            "Ransom Note",

            "Encrypted Extension"

        ]:

            risk = "🔴 Critical"

        elif ioc["type"] in [

            "Process",

            "Registry Path",

            "URL",

            "Domain"

        ]:

            risk = "🟠 High"

        elif ioc["type"] in [

            "Source IP",

            "Username"

        ]:

            risk = "🟡 Medium"

        IOCManager.repository.append({

            "type": ioc["type"],

            "value": ioc["value"],

            "confidence": ioc.get("confidence", "-"),

            "reputation": ioc.get("reputation", "-"),

            "risk": risk,

            "first_seen": now_str,

            "last_seen": now_str,

            "incidents": 1

        })

    # ----------------------------------------
    # Process IOC List
    # ----------------------------------------

    def process(self, incident):

        iocs = incident["ioc_list"]

        category = incident["category"]

        # ----------------------------------------
        # Malware
        # ----------------------------------------

        if category == "Malware":

            iocs.append({

                "type": "Domain",

                "value": random.choice(

                    self.domains +

                    [

                        "login.microsoft-support.com",

                        "secure-office365.net"

                    ]

                ),

                "confidence": "High",

                "reputation": "Credential Harvesting"

            })

            iocs.append({

                "type": "URL",

                "value": random.choice(

                    self.urls +

                    [

                        "https://mail-security.co/login",

                        "https://update-windows.org/download"

                    ]

                ),

                "confidence": "High",

                "reputation": "Malicious"

            })

            iocs.append({

                "type": "Registry Path",

                "value": random.choice(

                    self.registry_paths +

                    [

                        r"HKLM\Security",

                        r"HKLM\Software\Microsoft\Windows\CurrentVersion\Run"

                    ]

                ),

                "confidence": "High",

                "reputation": "Persistence"

            })

        # ----------------------------------------
        # Credential Access
        # ----------------------------------------

        elif category == "Credential Access":

            iocs.append({

                "type": "Domain",

                "value": random.choice(self.domains),

                "confidence": "High",

                "reputation": "Credential Harvesting"

            })

            iocs.append({

                "type": "URL",

                "value": random.choice(self.urls),

                "confidence": "High",

                "reputation": "Malicious"

            })

        # ----------------------------------------
        # Ransomware
        # ----------------------------------------

        elif category == "Ransomware":

            iocs.append({

                "type": "Registry Path",

                "value": random.choice(self.registry_paths),

                "confidence": "High",

                "reputation": "Persistence"

            })

        # ----------------------------------------
        # Store Repository
        # ----------------------------------------

        for ioc in iocs:

            self.add(ioc)

        total = 0

        for item in IOCManager.repository:

            total += item["incidents"]

        incident["ioc_statistics"] = {

            "total_iocs": total,

            "unique_iocs": len(IOCManager.repository)

        }

        return incident