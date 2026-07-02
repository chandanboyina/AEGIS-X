class DecisionEngine:
    """
    Commander AI Explainable Decision Engine.

    Makes the final response using the
    Enterprise Time Machine rather than
    the legacy Risk Forecast.
    """

    def decide(self, incident, forecast):

        confidence = forecast["forecast"]["confidence"]

        # -----------------------------------------
        # Enterprise Time Machine
        # -----------------------------------------

        timeline = forecast["forecast"]["time_machine"]["timeline"]

        if len(timeline) == 0:

            highest_attack = incident["category"]

            probability = confidence

        else:

            next_attack = max(

                timeline,

                key=lambda x: x["probability"]

            )

            highest_attack = next_attack["stage"]

            probability = next_attack["probability"]

        reasons = []

        # -----------------------------------------
        # Observer
        # -----------------------------------------

        observer = incident["observer_confidence"]

        if observer >= 80:

            reasons.append(

                f"High Observer confidence ({observer}%)."

            )

        elif observer >= 60:

            reasons.append(

                f"Moderate Observer confidence ({observer}%)."

            )

        # -----------------------------------------
        # MITRE
        # -----------------------------------------

        mitre = incident["mitre"]

        reasons.append(

            f"MITRE {mitre['id']} ({mitre['technique']}) observed."

        )

        # -----------------------------------------
        # IOC Intelligence
        # -----------------------------------------

        ioc_count = len(

            incident["ioc_list"]

        )

        reasons.append(

            f"{ioc_count} indicators of compromise identified."

        )

        # -----------------------------------------
        # Enterprise Time Machine Reasoning
        # -----------------------------------------

        if len(timeline):

            reasons.append(

                f"Predicted next stage: {highest_attack}."

            )

            reasons.append(

                f"Estimated probability: {probability}%."

            )

        # -----------------------------------------
        # Asset
        # -----------------------------------------

        reasons.append(

            f"Target asset: {incident['asset']}."

        )

        # -----------------------------------------
        # Decision Logic
        # -----------------------------------------

        if probability >= 90:

            action = "AUTONOMOUS CONTAINMENT"

            approval = False

        elif probability >= 70:

            action = "APPROVAL REQUIRED"

            approval = True

        elif probability >= 50:

            action = "ENHANCED MONITORING"

            approval = False

        else:

            action = "CONTINUOUS MONITORING"

            approval = False

        return {

            "predicted_attack": highest_attack,

            "probability": probability,

            "recommended_action": action,

            "human_approval": approval,

            "reasons": reasons

        }