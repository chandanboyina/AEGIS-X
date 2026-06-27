import random

from simulation.enterprise_assets import ENTERPRISE_ASSETS
from simulation.generators.ip_generator import IPGenerator
from simulation.generators.time_generator import TimeGenerator
from simulation.generators.port_generator import PortGenerator


class EnterpriseEventGenerator:
    """
    Generates realistic enterprise cyber events for AEGIS-X.
    """

    def __init__(self):

        # Enterprise users
        self.usernames = [
            "administrator",
            "john.smith",
            "alice.johnson",
            "raj.patel",
            "system",
            "finance.admin",
            "network.admin"
        ]

        # -----------------------------
        # Reconnaissance
        # -----------------------------
        self.recon_sources = [
            ("Firewall", "Port Scan", "HIGH"),
            ("DNS Server", "DNS Enumeration", "MEDIUM"),
            ("Network IDS", "Network Probe", "HIGH"),
            ("SMB Server", "SMB Enumeration", "MEDIUM"),
            ("Windows Security Log", "Failed Login", "MEDIUM")
        ]

        # -----------------------------
        # Credential Attacks
        # -----------------------------
        self.credential_sources = [
            ("Windows Security Log", "Brute Force Attack", "HIGH"),
            ("Active Directory", "Password Spray", "HIGH"),
            ("Privilege Manager", "Privilege Escalation", "CRITICAL")
        ]

        # -----------------------------
        # Malware
        # -----------------------------
        self.malware_sources = [
            ("Windows Defender", "Malware Detection", "HIGH"),
            ("PowerShell", "Suspicious PowerShell", "HIGH"),
            ("Endpoint Agent", "Registry Modification", "MEDIUM"),
            ("Network IDS", "Command and Control", "CRITICAL")
        ]

        # -----------------------------
        # Ransomware
        # -----------------------------
        self.ransomware_sources = [
            ("File Server", "Mass File Encryption", "CRITICAL"),
            ("Backup Server", "Backup Deletion", "CRITICAL"),
            ("Network Monitor", "Data Exfiltration", "CRITICAL"),
            ("Windows", "Shadow Copy Deletion", "CRITICAL")
        ]

    # ==========================================================
    # NORMAL BUSINESS EVENTS
    # ==========================================================

    def generate_normal_event(self):

        asset = random.choice(ENTERPRISE_ASSETS)

        event_catalog = {

            "Successful Login": {
                "source": "Windows Security Log",
                "severity": "LOW"
            },

            "SSH Login": {
                "source": "Linux SSH",
                "severity": "LOW"
            },

            "VPN Connection": {
                "source": "VPN Gateway",
                "severity": "LOW"
            },

            "Email Sent": {
                "source": "Microsoft Exchange",
                "severity": "LOW"
            },

            "Database Query": {
                "source": "Database",
                "severity": "LOW"
            }

        }

        event_type = random.choice(
            list(event_catalog.keys())
        )

        info = event_catalog[event_type]

        username = random.choice(self.usernames)

        return {

            "source": info["source"],

            "event_type": event_type,

            "severity": info["severity"],

            "username": username,

            "source_ip": IPGenerator.internal(),

            "destination_host": asset["hostname"],

            "timestamp": str(
                TimeGenerator.business_hours()
            ),

            "description":
                f"{event_type} performed by {username}.",

            "raw_log":
                f"{event_type} successful.",

            "asset": asset

        }

    # ==========================================================
    # RECONNAISSANCE EVENTS
    # ==========================================================

    def generate_recon_event(self):

        asset = random.choice(
            ENTERPRISE_ASSETS
        )

        source, event_type, severity = random.choice(
            self.recon_sources
        )

        attacker_ip = IPGenerator.external()

        destination_ip = IPGenerator.internal()

        ports = [

            p["port"]

            for p in PortGenerator.random_scan()

        ]

        attempts = random.randint(
            20,
            600
        )

        return {

            "source": source,

            "event_type": event_type,

            "severity": severity,

            "source_ip": attacker_ip,

            "destination_ip": destination_ip,

            "destination_host": asset["hostname"],

            "ports": ports,

            "attempts": attempts,

            "timestamp": str(
                TimeGenerator.night_hours()
            ),

            "description":
                f"{event_type} detected from {attacker_ip}.",

            "raw_log":
                f"{attempts} suspicious requests detected.",

            "asset": asset

        }

    # ==========================================================
    # CREDENTIAL ATTACKS
    # ==========================================================

    def generate_credential_attack(self):

        asset = random.choice(
            ENTERPRISE_ASSETS
        )

        source, event_type, severity = random.choice(
            self.credential_sources
        )

        attacker = IPGenerator.external()

        username = random.choice(
            self.usernames
        )

        attempts = random.randint(
            50,
            1000
        )

        return {

            "source": source,

            "event_type": event_type,

            "severity": severity,

            "username": username,

            "source_ip": attacker,

            "destination_host": asset["hostname"],

            "attempts": attempts,

            "timestamp": str(
                TimeGenerator.night_hours()
            ),

            "description":
                f"{event_type} targeting '{username}' from {attacker}.",

            "raw_log":
                f"{attempts} authentication attempts detected.",

            "asset": asset

        }

    # ==========================================================
    # MALWARE EVENTS
    # ==========================================================

    def generate_malware_event(self):

        asset = random.choice(
            ENTERPRISE_ASSETS
        )

        source, event_type, severity = random.choice(
            self.malware_sources
        )

        attacker = IPGenerator.external()

        process = random.choice([

            "powershell.exe",

            "cmd.exe",

            "rundll32.exe",

            "svchost.exe",

            "wmic.exe"

        ])

        return {

            "source": source,

            "event_type": event_type,

            "severity": severity,

            "source_ip": attacker,

            "destination_host": asset["hostname"],

            "process": process,

            "timestamp": str(
                TimeGenerator.night_hours()
            ),

            "description":
                f"{event_type} involving {process}.",

            "raw_log":
                f"Suspicious process {process} executed.",

            "asset": asset

        }

    # ==========================================================
    # RANSOMWARE EVENTS
    # ==========================================================

    def generate_ransomware_event(self):

        asset = random.choice(
            ENTERPRISE_ASSETS
        )

        source, event_type, severity = random.choice(
            self.ransomware_sources
        )

        encrypted_files = random.randint(
            100,
            5000
        )

        deleted_backups = random.randint(
            0,
            20
        )

        return {

            "source": source,

            "event_type": event_type,

            "severity": severity,

            "encrypted_files": encrypted_files,

            "deleted_backups": deleted_backups,

            "timestamp": str(
                TimeGenerator.night_hours()
            ),

            "description":
                f"{encrypted_files} files encrypted.",

            "raw_log":
                "Potential ransomware activity detected.",

            "asset": asset

        }