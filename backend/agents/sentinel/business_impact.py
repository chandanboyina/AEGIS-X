class BusinessImpact:
    """
    Assesses business impact of an incident.
    """

    def assess(self, packet):

        asset = packet["asset"]

        oracle = packet["oracle"]

        category = oracle["category"]

        criticality = asset["criticality"]

        # -----------------------------
        # Defaults
        # -----------------------------
        impact = "LOW"

        downtime = "15 minutes"

        priority = "P4"

        services = []

        # -----------------------------
        # Asset → Business Services
        # -----------------------------
        hostname = asset["hostname"]

        if "DB" in hostname:

            services = [

                "Student Database",

                "ERP Database",

                "Reporting Services"

            ]

        elif "WEB" in hostname:

            services = [

                "Student Portal",

                "Public Website"

            ]

        elif "EMAIL" in hostname:

            services = [

                "Enterprise Email",

                "Notifications"

            ]

        elif "VPN" in hostname:

            services = [

                "Remote Access",

                "Employee Connectivity"

            ]

        elif "BACKUP" in hostname:

            services = [

                "Enterprise Backup",

                "Disaster Recovery"

            ]

        else:

            services = [

                "Internal Business Services"

            ]

        # -----------------------------
        # Threat Impact
        # -----------------------------
        if category == "Reconnaissance":

            impact = "LOW"

            downtime = "None"

            priority = "P4"

        elif category == "Credential Access":

            impact = "MEDIUM"

            downtime = "15 minutes"

            priority = "P3"

        elif category == "Privilege Escalation":

            impact = "HIGH"

            downtime = "30 minutes"

            priority = "P2"

        elif category == "Malware":

            impact = "HIGH"

            downtime = "45 minutes"

            priority = "P2"

        elif category == "Ransomware":

            impact = "CRITICAL"

            downtime = "2-4 hours"

            priority = "P1"

        # Critical assets always increase impact
        if criticality == "Critical":

            impact = "CRITICAL"

            priority = "P1"

        return {

            "criticality": criticality,

            "impact": impact,

            "downtime": downtime,

            "priority": priority,

            "affected_services": services

        }