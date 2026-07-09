from collectors.security.security_parser import SecurityParser
from collectors.defender.defender_parser import DefenderParser
from collectors.powershell.powershell_parser import PowerShellParser
from collectors.dns.dns_parser import DNSParser
from collectors.sysmon.sysmon_parser import SysmonParser


class WindowsParser:
    """
    Enterprise Windows Telemetry Parser.

    Normalizes every Windows telemetry source into
    enterprise intelligence.
    """

    def __init__(self):

        self.security = SecurityParser()

        self.defender = DefenderParser()

        self.powershell = PowerShellParser()

        self.dns = DNSParser()

        self.sysmon = SysmonParser()

    def parse(self, telemetry):

        parsed = {

            "security": [],

            "defender": [],

            "powershell": [],

            "dns": [],

            "sysmon": []

        }

        #
        # Security
        #

        for event in telemetry.get("security", []):

            parsed["security"].append(

                self.security.parse(event)

            )

        #
        # Defender
        #

        for event in telemetry.get("defender", []):

            parsed["defender"].append(

                self.defender.parse(event)

            )

        #
        # PowerShell
        #

        for event in telemetry.get("powershell", []):

            parsed["powershell"].append(

                self.powershell.parse(event)

            )

        #
        # DNS
        #

        for event in telemetry.get("dns", []):

            parsed["dns"].append(

                self.dns.parse(event)

            )

        #
        # Sysmon
        #

        for event in telemetry.get("sysmon", []):

            parsed["sysmon"].append(

                self.sysmon.parse(event)

            )

        return parsed