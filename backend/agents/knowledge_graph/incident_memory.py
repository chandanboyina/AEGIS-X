from collections import defaultdict
from copy import deepcopy

class IncidentMemory:
    """
    Enterprise Cyber Brain Memory.

    Stores historical incidents and
    enables future reasoning.
    """

    def __init__(self):

        self.memory = []

        self.by_asset = defaultdict(list)

        self.by_user = defaultdict(list)

        self.by_mitre = defaultdict(list)

    def remember(self, incident):

        incident_copy = deepcopy(incident)

        self.memory.append(incident_copy)

        hostname = incident["asset"]["hostname"]

        self.by_asset[hostname].append(incident_copy)

        username = incident.get(
            "username",
            "Unknown"
        )

        self.by_user[username].append(incident_copy)

        mitre = incident["mitre"]["id"]

        self.by_mitre[mitre].append(incident_copy)

    def all(self):

        return self.memory

    def incidents_for_asset(

        self,

        asset

    ):

        return self.by_asset.get(

            asset,

            []

        )

    def incidents_for_user(

        self,

        username

    ):

        return self.by_user.get(

            username,

            []

        )

    def incidents_for_mitre(

        self,

        mitre

    ):

        return self.by_mitre.get(

            mitre,

            []

        )