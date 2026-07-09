class CorrelationScore:
    """
    Calculates enterprise threat correlation.
    """

    def calculate(

        self,

        intelligence

    ):

        score = 0

        if intelligence["mitre"]:
            score += 15

        score += len(
            intelligence["cves"]
        ) * 10

        score += len(
            intelligence["certin"]
        ) * 10

        score += len(
            intelligence["cisa"]
        ) * 20

        score += len(
            intelligence["vendor"]
        ) * 10

        score += len(
            intelligence["exploitdb"]
        ) * 25

        return min(
            score,
            100
        )