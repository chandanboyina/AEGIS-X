from agents.incident_manager.incident_repository import IncidentRepository


class ThreatHunter:
    """
    Enterprise Threat Hunting Engine.
    Searches across all stored incidents.
    """

    # ----------------------------------------
    # Search by Source IP
    # ----------------------------------------

    def search_by_ip(self, ip):

        matches = []

        for incident in IncidentRepository.incidents:

            for ioc in incident["ioc_list"]:

                if (
                    ioc["type"] == "Source IP"
                    and
                    ioc["value"] == ip
                ):

                    matches.append(incident)
                    break

        return matches

    # ----------------------------------------
    # Search by Username
    # ----------------------------------------

    def search_by_username(self, username):

        matches = []

        for incident in IncidentRepository.incidents:

            for ioc in incident["ioc_list"]:

                if (
                    ioc["type"] == "Username"
                    and
                    ioc["value"] == username
                ):

                    matches.append(incident)
                    break

        return matches

    # ----------------------------------------
    # Search by Domain
    # ----------------------------------------

    def search_by_domain(self, domain):

        matches = []

        for incident in IncidentRepository.incidents:

            for ioc in incident["ioc_list"]:

                if (
                    ioc["type"] == "Domain"
                    and
                    ioc["value"] == domain
                ):

                    matches.append(incident)
                    break

        return matches

    # ----------------------------------------
    # Search by URL
    # ----------------------------------------

    def search_by_url(self, url):

        matches = []

        for incident in IncidentRepository.incidents:

            for ioc in incident["ioc_list"]:

                if (
                    ioc["type"] == "URL"
                    and
                    ioc["value"] == url
                ):

                    matches.append(incident)
                    break

        return matches

    # ----------------------------------------
    # Search by Registry Path
    # ----------------------------------------

    def search_by_registry(self, path):

        matches = []

        for incident in IncidentRepository.incidents:

            for ioc in incident["ioc_list"]:

                if (
                    ioc["type"] == "Registry Path"
                    and
                    ioc["value"] == path
                ):

                    matches.append(incident)
                    break

        return matches

    # ----------------------------------------
    # Search by Hash
    # ----------------------------------------

    def search_by_hash(self, hash_value):

        matches = []

        for incident in IncidentRepository.incidents:

            for ioc in incident["ioc_list"]:

                if (

                    ioc["type"] in [

                        "MD5",
                        "SHA1",
                        "SHA256"

                    ]

                    and

                    ioc["value"] == hash_value

                ):

                    matches.append(incident)
                    break

        return matches

    # ----------------------------------------
    # Search by Hostname
    # ----------------------------------------

    def search_by_hostname(self, hostname):

        matches = []

        for incident in IncidentRepository.incidents:

            if incident["asset"]["hostname"] == hostname:

                matches.append(incident)

        return matches

    # ----------------------------------------
    # Search by MITRE Technique
    # ----------------------------------------

    def search_by_mitre(self, technique_id):

        matches = []

        for incident in IncidentRepository.incidents:

            if (

                incident["mitre"]["id"]

                ==

                technique_id

            ):

                matches.append(incident)

        return matches

    # ----------------------------------------
    # Search by Category
    # ----------------------------------------

    def search_by_category(self, category):

        matches = []

        for incident in IncidentRepository.incidents:

            if incident["category"] == category:

                matches.append(incident)

        return matches