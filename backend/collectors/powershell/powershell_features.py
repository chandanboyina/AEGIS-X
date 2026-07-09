class PowerShellFeatures:
    """
    Extracts enterprise PowerShell features.
    """

    def extract(self, powershell):

        context = powershell.get(
            "context",
            ""
        ).lower()

        payload = powershell.get(
            "payload",
            ""
        ).lower()

        text = context + "\n" + payload

        return {

            #
            # Execution
            #

            "encoded_command":

                "-encodedcommand" in text
                or "-enc" in text,

            "hidden_window":

                "-w hidden" in text
                or "-windowstyle hidden" in text,

            "execution_policy_bypass":

                "executionpolicy bypass" in text
                or "-ep bypass" in text,

            #
            # Download Activity
            #

            "download_activity":

                "downloadstring" in text
                or "invoke-webrequest" in text
                or "start-bitstransfer" in text,

            #
            # Credential Access
            #

            "credential_access":

                "invoke-mimikatz" in text
                or "sekurlsa" in text,

            #
            # Defense Evasion
            #

            "amsi_bypass":

                "amsi" in text,

            "reflection":

                "reflection.assembly" in text,

            "base64":

                "frombase64string" in text,

            #
            # LOLBins
            #

            "invoke_expression":

                "invoke-expression" in text
                or "iex " in text,

            #
            # Context
            #

            "host_application":

                self.extract_value(

                    context,

                    "host application ="

                ),

            "user":

                self.extract_value(

                    context,

                    "user ="

                ),

            "command":

                self.extract_value(

                    context,

                    "command name ="

                )

        }

    def extract_value(

        self,

        text,

        key

    ):

        for line in text.splitlines():

            line = line.strip()

            if line.startswith(key):

                return line.replace(

                    key,

                    ""

                ).strip()

        return ""