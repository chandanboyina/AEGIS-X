from collectors.security.security_collector import SecurityCollector
from collectors.defender.defender_collector import DefenderCollector
from collectors.dns.dns_collector import DNSCollector
from collectors.powershell.powershell_collector import PowerShellCollector
from collectors.sysmon.sysmon_collector import SysmonCollector


class WindowsCollector:
    """
    Enterprise Windows Telemetry Collector.
    """

    def __init__(self):

        self.security = SecurityCollector()

        self.defender = DefenderCollector()

        self.powershell = PowerShellCollector()

        self.dns = DNSCollector()

        self.sysmon = SysmonCollector()

    def collect(self):

        return {

            "security":

                self.security.collect(),

            "defender":

                self.defender.collect(),

            "powershell":

                self.powershell.collect(),

            "dns":

                self.dns.collect(),

            "sysmon":

                self.sysmon.collect()

        }