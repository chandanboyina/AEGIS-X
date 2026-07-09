class ObserverExplainer:

    def explain(self, incident):

        observer = incident.get("observer", {})

        return {

            "confidence": observer.get("confidence", 0),

            "classification": observer.get("classification", "Unknown"),

            "score": observer.get("score", 0),

            "reasoning": [

                f"Observer classified this activity as {observer.get('classification','Unknown')}.",

                f"Confidence score is {observer.get('confidence',0)}%.",

                observer.get(
                    "reason",
                    "Decision generated from behavioral evidence."
                )

            ]

        }