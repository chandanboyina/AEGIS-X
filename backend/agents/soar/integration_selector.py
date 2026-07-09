class IntegrationSelector:
    """
    Chooses the best SOAR integration
    based on the affected asset.
    """

    def select(
        self,
        action,
        target
    ):

        target = target.lower()

        # Firewall
        if any(word in target for word in [

            "firewall",

            "network",

            "router",

            "switch"

        ]):

            return "PALOALTO"

        # Windows

        if any(word in target for word in [

            "windows",

            "endpoint",

            "desktop",

            "workstation"

        ]):

            return "DEFENDER"

        # Linux

        if any(word in target for word in [

            "linux",

            "ubuntu",

            "redhat",

            "server"

        ]):

            return "CROWDSTRIKE"

        # Active Directory

        if any(word in target for word in [

            "domain",

            "active directory",

            "ad"

        ]):

            return "DEFENDER"

        # Database

        if any(word in target for word in [

            "database",

            "sql",

            "mysql",

            "postgres"

        ]):

            return "SERVICENOW"

        return "GENERIC"