class AssetInventory:
    """
    Enterprise Asset Inventory (CMDB)

    Generic inventory that classifies assets by
    hostname patterns instead of exact names.

    Works for:
    - CBSE
    - AIIMS
    - Banks
    - Airports
    - Power Grid
    - Manufacturing
    """

    def __init__(self):

        self.patterns = {

            "WEB": {
                "service": "Web Platform",
                "business_unit": "Digital Services",
                "criticality": "High",
                "enterprise_users": 500000,
                "hourly_cost": 1200000
            },

            "APP": {
                "service": "Application Platform",
                "business_unit": "Business Applications",
                "criticality": "High",
                "enterprise_users": 250000,
                "hourly_cost": 1500000
            },

            "API": {
                "service": "API Gateway",
                "business_unit": "Integration",
                "criticality": "High",
                "enterprise_users": 400000,
                "hourly_cost": 1800000
            },

            "DB": {
                "service": "Database",
                "business_unit": "Data",
                "criticality": "Critical",
                "enterprise_users": 4500000,
                "hourly_cost": 5000000
            },

            "FW": {
                "service": "Perimeter Firewall",
                "business_unit": "Security",
                "criticality": "Critical",
                "enterprise_users": 4500000,
                "hourly_cost": 3000000
            },

            "VPN": {
                "service": "Remote Access",
                "business_unit": "Infrastructure",
                "criticality": "High",
                "enterprise_users": 50000,
                "hourly_cost": 900000
            },

            "EMAIL": {
                "service": "Enterprise Email",
                "business_unit": "Communication",
                "criticality": "High",
                "enterprise_users": 120000,
                "hourly_cost": 1200000
            },

            "BACKUP": {
                "service": "Backup Infrastructure",
                "business_unit": "Disaster Recovery",
                "criticality": "Critical",
                "enterprise_users": 4500000,
                "hourly_cost": 2500000
            },

            "AUTH": {
                "service": "Authentication",
                "business_unit": "Identity",
                "criticality": "Critical",
                "enterprise_users": 4500000,
                "hourly_cost": 3500000
            },

            "DNS": {
                "service": "DNS",
                "business_unit": "Infrastructure",
                "criticality": "High",
                "enterprise_users": 4500000,
                "hourly_cost": 1000000
            },

            "SIEM": {
                "service": "Security Monitoring",
                "business_unit": "SOC",
                "criticality": "High",
                "enterprise_users": 200,
                "hourly_cost": 700000
            },

            "STORAGE": {
                "service": "Storage",
                "business_unit": "Infrastructure",
                "criticality": "Critical",
                "enterprise_users": 4500000,
                "hourly_cost": 2800000
            },

            "LB": {
                "service": "Load Balancer",
                "business_unit": "Infrastructure",
                "criticality": "High",
                "enterprise_users": 4500000,
                "hourly_cost": 1500000
            }

        }

    def get(self, hostname):

        hostname = hostname.upper()

        for pattern, profile in self.patterns.items():

            if pattern in hostname:

                return profile.copy()

        return {

            "service": "Generic Server",

            "business_unit": "General",

            "criticality": "Medium",

            "enterprise_users": 5000,

            "hourly_cost": 300000

        }