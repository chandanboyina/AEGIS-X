class BehaviorReasoner:
    """
    Enterprise Behavioral Reasoning Engine.

    Compares current observations against the
    learned enterprise baseline and determines

    • Deviation
    • Behavioral status
    • Risk
    • Confidence
    • Human-readable explanation
    """

    # -----------------------------------------
    # Percentage deviation
    # -----------------------------------------

    def deviation(

        self,

        current,

        expected

    ):

        if expected <= 0:

            return 100.0

        return round(

            abs(current - expected)

            /

            expected

            *

            100,

            2

        )

    # -----------------------------------------
    # Classify deviation
    # -----------------------------------------

    def classify(

        self,

        deviation

    ):

        if deviation < 15:

            return {

                "behavior": "Normal",

                "risk": 5,

                "confidence": 98

            }

        if deviation < 35:

            return {

                "behavior": "Minor Deviation",

                "risk": 25,

                "confidence": 90

            }

        if deviation < 60:

            return {

                "behavior": "Suspicious",

                "risk": 50,

                "confidence": 85

            }

        if deviation < 100:

            return {

                "behavior": "Abnormal",

                "risk": 75,

                "confidence": 92

            }

        return {

            "behavior": "Critical",

            "risk": 95,

            "confidence": 99

        }

    # -----------------------------------------
    # Explain result
    # -----------------------------------------

    def explain(

        self,

        entity,

        current,

        expected,

        deviation,

        behavior

    ):

        if behavior == "Normal":

            return (

                f"{entity} activity matches "

                "historical enterprise behavior."

            )

        if behavior == "Minor Deviation":

            return (

                f"{entity} shows a small deviation "

                "from its learned baseline."

            )

        if behavior == "Suspicious":

            return (

                f"{entity} is behaving differently "

                "than usual."

            )

        if behavior == "Abnormal":

            return (

                f"{entity} significantly deviates "

                "from historical behavior."

            )

        return (

            f"{entity} exhibits extremely unusual "

            "behavior requiring immediate investigation."

        )

    # -----------------------------------------
    # Complete reasoning
    # -----------------------------------------

    def analyze(

        self,

        entity,

        current,

        expected

    ):

        deviation = self.deviation(

            current,

            expected

        )

        result = self.classify(

            deviation

        )

        return {

            "expected": expected,

            "current": current,

            "deviation": deviation,

            "behavior": result["behavior"],

            "risk": result["risk"],

            "confidence": result["confidence"],

            "reason": self.explain(

                entity,

                current,

                expected,

                deviation,

                result["behavior"]

            )

        }