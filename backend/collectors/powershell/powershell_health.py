class PowerShellHealth:
    """
    Enterprise PowerShell Behavior Analysis.
    """

    SUSPICIOUS_KEYWORDS = [

        "invoke-expression",

        "iex",

        "downloadstring",

        "invoke-webrequest",

        "invoke-mimikatz",

        "-encodedcommand",

        "-enc",

        "-nop",

        "-w hidden",

        "executionpolicy bypass",

        "reflection.assembly",

        "amsi",

        "frombase64string"

    ]

    def evaluate(self, features):

            score = 0

            findings = []

            if features["encoded_command"]:
                score += 25
                findings.append("Encoded Command")

            if features["download_activity"]:
                score += 25
                findings.append("Download Activity")

            if features["credential_access"]:
                score += 30
                findings.append("Credential Access")

            if features["invoke_expression"]:
                score += 20
                findings.append("Invoke-Expression")

            if features["execution_policy_bypass"]:
                score += 20
                findings.append("ExecutionPolicy Bypass")

            if features["hidden_window"]:
                score += 15
                findings.append("Hidden Window")

            if features["amsi_bypass"]:
                score += 40
                findings.append("AMSI Bypass")

            if features["reflection"]:
                score += 20
                findings.append("Reflection")

            if features["base64"]:
                score += 20
                findings.append("Base64")

            score = min(score, 100)

            if score >= 70:
                status = "Critical"

            elif score >= 40:
                status = "Warning"

            else:
                status = "Healthy"

            return {

                "behavior_score": score,

                "status": status,

                "findings": findings

            }