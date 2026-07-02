class SysmonParser:

    def parse(self, log):

        log["source"] = "Sysmon"

        return log