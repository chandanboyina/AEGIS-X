"""
===========================================================
AEGIS-X Demo Event Generator

Creates enterprise Cyber Evidence Packets
for the complete AI pipeline.

Author : AEGIS-X
===========================================================
"""

from datetime import datetime
import uuid


class DemoEventGenerator:

    @staticmethod
    def privilege_escalation():

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        packet = {

            ###################################################
            # Incident Information
            ###################################################

            "incident_id": str(uuid.uuid4()),

            "category": "Privilege Escalation",

            "severity": "High",

            "status": "Open",

            "created": now,

            ###################################################
            # Asset
            ###################################################

            "asset": {

                "hostname": "DB-SERVER-01",

                "ip": "10.10.20.15",

                "criticality": "Critical"

            },

            ###################################################
            # Enterprise Asset Profile
            ###################################################

            "asset_profile": {

                "criticality": "Critical",

                "service": "Database",

                "department": "Finance",

                "owner": "Database Team",

                "os": "Windows Server 2022",

                "enterprise_users": 1200,

                "hourly_cost": 45000

            },

            ###################################################
            # User
            ###################################################

            "username": "dbadmin",

            "department": "Finance",

            "role": "Database Administrator",

            ###################################################
            # Context
            ###################################################

            "context": {

                "business_hours": False,

                "location": "Data Center",

                "country": "India"

            },

            ###################################################
            # Behaviour
            ###################################################

            "behavior": {

                "features": {

                    "severity_score": 96,

                    "failed_logins": 18,

                    "successful_logins": 1,

                    "new_processes": 7,

                    "privilege_changes": 3,

                    "network_connections": 42

                }

            },

            ###################################################
            # MITRE
            ###################################################

            "mitre": {

                "id": "T1068",

                "tactic": "Privilege Escalation",

                "technique": "Exploitation for Privilege Escalation"

            },

            ###################################################
            # Event
            ###################################################

            "event": {

                "source": "Windows Security",

                "event_id": 4672,

                "description": "Special privileges assigned to new logon."

            },

            ###################################################
            # Metadata
            ###################################################

            "metadata": {

                "generated_at": now,

                "pipeline_version": "1.0"

            },

            ###################################################
            # Empty Containers
            ###################################################

            "observer": {},

            "oracle": {},

            "sentinel": {},

            "commander": {},

            "enterprise_context": {},

            "enterprise_intelligence": {},

            "predictions": {},

            "recommendations": {},

            "telemetry": {},

            "incident": {},

            "notes": [],

            "warnings": [],

            "audit": []

        }

        return packet


    @staticmethod
    def ransomware():

        packet = DemoEventGenerator.privilege_escalation()

        packet["category"] = "Ransomware"

        packet["severity"] = "Critical"

        packet["mitre"] = {

            "id": "T1486",

            "tactic": "Impact",

            "technique": "Data Encrypted for Impact"

        }

        packet["asset"]["hostname"] = "FINANCE-SRV-01"

        packet["username"] = "administrator"

        packet["behavior"]["features"]["severity_score"] = 100

        return packet


    @staticmethod
    def insider_threat():

        packet = DemoEventGenerator.privilege_escalation()

        packet["category"] = "Insider Threat"

        packet["severity"] = "Medium"

        packet["mitre"] = {

            "id": "T1078",

            "tactic": "Valid Accounts",

            "technique": "Valid Accounts"

        }

        packet["username"] = "john.smith"

        packet["asset"]["hostname"] = "HR-LAPTOP-02"

        packet["behavior"]["features"]["severity_score"] = 74

        return packet


    @staticmethod
    def lateral_movement():

        packet = DemoEventGenerator.privilege_escalation()

        packet["category"] = "Lateral Movement"

        packet["severity"] = "High"

        packet["mitre"] = {

            "id": "T1021",

            "tactic": "Lateral Movement",

            "technique": "Remote Services"

        }

        packet["username"] = "svc_backup"

        packet["asset"]["hostname"] = "APP-SERVER-01"

        packet["behavior"]["features"]["severity_score"] = 91

        return packet