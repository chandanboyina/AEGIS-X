class UEBAVote:

    def vote(

        self,

        recommendation,

        result

    ):

        return {

            "agent":"UEBA",

            "recommendation": recommendation,

            "confidence": result["confidence"],

            "weight":0.15,

            "reason":[

                f"Isolation Forest anomaly score {result['score']:.3f}.",

                "Behavior analyzed using unsupervised learning."

            ],

            "evidence": result

        }