import json
from pathlib import Path


class BehaviorDatabase:
    """
    Enterprise UEBA Behavior Database.

    Stores learned behavioral baselines for

    - Users
    - Hosts
    - Processes
    """

    def __init__(self):

        root = Path(__file__).resolve().parents[2]

        self.db_path = root / "data" / "behavior_profiles.json"

        if not self.db_path.exists():

            self.save({

                "users": {},

                "hosts": {},

                "processes": {},

                "devices": {},

                "networks": {},

                "time_profiles": {},

                "peer_groups": {}

            })

    def load(self):

        with open(

            self.db_path,

            encoding="utf-8"

        ) as f:

            data = json.load(f)

        #
        # Schema migration
        #

        data.setdefault("users", {})

        data.setdefault("hosts", {})

        data.setdefault("processes", {})

        data.setdefault("devices", {})

        data.setdefault("networks", {})

        data.setdefault("time_profiles", {})

        data.setdefault("peer_groups", {})

        return data

    def save(self, data):

        with open(

            self.db_path,

            "w",

            encoding="utf-8"

        ) as f:

            json.dump(

                data,

                f,

                indent=4

            )

    # --------------------------
    # User
    # --------------------------

    def get_user(self, username):

        data = self.load()

        return data["users"].get(

            username,

            None

        )

    def update_user(

        self,

        username,

        profile

    ):

        data = self.load()

        data["users"][username] = profile

        self.save(data)

    # --------------------------
    # Host
    # --------------------------

    def get_host(

        self,

        hostname

    ):

        data = self.load()

        return data["hosts"].get(

            hostname,

            None

        )

    def update_host(

        self,

        hostname,

        profile

    ):

        data = self.load()

        data["hosts"][hostname] = profile

        self.save(data)

    # --------------------------
    # Process
    # --------------------------

    def get_process(

        self,

        process

    ):

        data = self.load()

        return data["processes"].get(

            process,

            None

        )

    def update_process(

        self,

        process,

        profile

    ):

        data = self.load()

        data["processes"][process] = profile

        self.save(data)

    # --------------------------
    # Device
    # --------------------------

    def get_device(self, hostname):

        data = self.load()

        return data["devices"].get(hostname)


    def update_device(self, hostname, profile):

        data = self.load()

        data["devices"][hostname] = profile

        self.save(data)

    # --------------------------
    # Network
    # --------------------------

    def get_network(self, hostname):

        data = self.load()

        return data["networks"].get(hostname)


    def update_network(self, hostname, profile):

        data = self.load()

        data["networks"][hostname] = profile

        self.save(data)

    # --------------------------
    # Time Profile
    # --------------------------

    def get_time_profile(

        self,

        hostname

    ):

        data = self.load()

        return data["time_profiles"].get(

            hostname,

            None

        )


    def update_time_profile(

        self,

        hostname,

        profile

    ):

        data = self.load()

        data["time_profiles"][hostname] = profile

        self.save(data)


    # --------------------------
    # Time
    # --------------------------

    def get_time(self, hostname):

        data = self.load()

        return data["time_profiles"].get(hostname)


    def update_time(self, hostname, profile):

        data = self.load()

        data["time_profiles"][hostname] = profile

        self.save(data)


    # --------------------------
    # Peer Groups
    # --------------------------

    def get_peer_group(

        self,

        group

    ):

        data = self.load()

        return data["peer_groups"].get(

            group,

            None

        )


    def update_peer_group(

        self,

        group,

        profile

    ):

        data = self.load()

        data["peer_groups"][group] = profile

        self.save(data)