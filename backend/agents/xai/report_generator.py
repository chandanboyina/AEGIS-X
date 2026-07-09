class ReportGenerator:

    """
    Generates an executive summary.
    """

    def generate(
        self,
        incident,
        explanation
    ):

        playbook = explanation["playbook"]

        council = explanation["council"]

        return {

            "title": "Commander AI Executive Summary",

            "summary": (

                f"Incident '{incident['category']}' "

                f"was resolved using "

                f"{playbook['selected']} "

                f"supported by "

                f"{council['agreement']} "

                f"AI agents."

            )

        }