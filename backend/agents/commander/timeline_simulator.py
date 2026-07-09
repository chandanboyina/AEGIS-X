from datetime import datetime, timedelta

STAGE_IMPACT = {

    "Reconnaissance":0.02,

    "Credential Access":0.05,

    "Resource Development":0.07,

    "Privilege Escalation":0.10,

    "Credential Dumping":0.15,

    "Defense Evasion":0.18,

    "Lateral Movement":0.20,

    "Collection":0.22,

    "Exfiltration":0.30,

    "Ransomware":0.45,

    "Impact":0.50

}

class TimelineSimulator:
    """
    Simulates how an incident evolves over time.

    Predicts:

        • Attack stage
        • Compromised services
        • Estimated business loss
        • Whether containment succeeds
    """

    def simulate(

        self,

        incident,

        attack_path,

        digital_twin,

        business_impact,

        playbook=None

    ):
        
        # ---------------------------------------
        # Attack completely stopped
        # Show recovery instead of attack stages
        # ---------------------------------------

        if (
            playbook
            and (
                playbook["graph"]["stopped"]
                or len(playbook["graph"]["remaining_path"]) == 0
            )
        ):
            now = datetime.now()
            
            if playbook:
                current_loss = round(
                    playbook["estimated_loss"],
                    2
                )
            else:
                current_loss = round(
                    business_impact["estimated_loss_value"],
                    2
                )

            return [

                {

                    "time": (
                        now +
                        timedelta(minutes=15)
                    ).strftime("%H:%M"),

                    "eta": 15,

                    "stage": "Containment Successful",

                    "reason":
                        "Selected playbook successfully "
                        "blocked the remaining attack graph.",

                    "affected_services": 0,

                    "estimated_loss": current_loss

                },

                {

                    "time": (
                        now +
                        timedelta(minutes=30)
                    ).strftime("%H:%M"),

                    "eta": 30,

                    "stage": "Recovery Started",

                    "reason":
                        "SOC starts restoring isolated "
                        "enterprise services.",

                    "affected_services": 0,

                    "estimated_loss": current_loss

                },

                {

                    "time": (
                        now +
                        timedelta(minutes=45)
                    ).strftime("%H:%M"),

                    "eta": 45,

                    "stage": "Business Services Restored",

                    "reason":
                        "Business-critical services are "
                        "returning to production.",

                    "affected_services": 0,

                    "estimated_loss": current_loss

                },

                {

                    "time": (
                        now +
                        timedelta(minutes=60)
                    ).strftime("%H:%M"),

                    "eta": 60,

                    "stage": "Incident Closed",

                    "reason":
                        "Recovery completed. Enterprise "
                        "operations returned to normal.",

                    "affected_services": 0,

                    "estimated_loss": current_loss

                }

            ]

        timeline = []

        now = datetime.now()

        spread = len(
            digital_twin["spread"]
        )

        if playbook:
            loss = playbook["estimated_loss"]
        else:
            loss = business_impact[
                "estimated_loss_value"
            ]

        accumulated_loss = loss

        stages = attack_path

        if len(stages) == 0:

            if playbook:
                current_loss = round(
                    playbook["estimated_loss"],
                    2
                )
            else:
                current_loss = round(
                    business_impact["estimated_loss_value"],
                    2
                )

            return [

                {
                    "time": (
                        now + timedelta(minutes=15)
                    ).strftime("%H:%M"),
                    "eta": 15,
                    "stage": "Containment Successful",
                    "reason": "No further attack stages predicted.",
                    "affected_services": 0,
                    "estimated_loss": current_loss
                },

                {
                    "time": (
                        now + timedelta(minutes=30)
                    ).strftime("%H:%M"),
                    "eta": 30,
                    "stage": "Recovery Started",
                    "reason": "Recovery operations are underway.",
                    "affected_services": 0,
                    "estimated_loss": current_loss
                },

                {
                    "time": (
                        now + timedelta(minutes=45)
                    ).strftime("%H:%M"),
                    "eta": 45,
                    "stage": "Business Services Restored",
                    "reason": "Critical services restored.",
                    "affected_services": 0,
                    "estimated_loss": current_loss
                },

                {
                    "time": (
                        now + timedelta(minutes=60)
                    ).strftime("%H:%M"),
                    "eta": 60,
                    "stage": "Incident Closed",
                    "reason": "Recovery completed.",
                    "affected_services": 0,
                    "estimated_loss": current_loss
                }

            ]

        reasons = {

            "Reconnaissance":
                "External reconnaissance against enterprise assets is continuing.",

            "Resource Development":
                "Attacker prepares malicious infrastructure and payloads.",

            "Initial Access":
                "Initial compromise of the enterprise is expected.",

            "Credential Access":
                "Compromised credentials remain active and usable.",

            "Credential Dumping":
                "Additional credentials are likely to be extracted from compromised systems.",

            "Execution":
                "Malicious code execution is expected on affected hosts.",

            "Persistence":
                "Attacker attempts to establish long-term persistence.",

            "Privilege Escalation":
                "Attacker attempts to obtain elevated administrative privileges.",

            "Defense Evasion":
                "Malicious activity attempts to bypass enterprise security controls.",

            "Discovery":
                "Attacker is identifying valuable systems and network resources.",

            "Lateral Movement":
                "Compromise is expected to spread across connected enterprise assets.",

            "Collection":
                "Sensitive enterprise information is likely being collected.",

            "Command and Control":
                "Compromised systems communicate with attacker infrastructure.",

            "Exfiltration":
                "Enterprise data exfiltration is likely to begin.",

            "Impact":
                "Critical enterprise services may become unavailable.",

            "Business Disruption":
                "Business operations are expected to be interrupted.",

            "Ransomware":
                "File encryption activity is expected to begin."

        }

        for i, stage in enumerate(stages):

            # ---------------------------------
            # Support both formats
            # ---------------------------------

            if isinstance(stage, dict):

                stage_name = stage["stage"]

                probability = stage.get(
                    "probability",
                    None
                )

                eta_prediction = stage.get(
                    "eta_minutes",
                    (i + 1) * 15
                )

            else:

                stage_name = stage

                probability = None

                eta_prediction = (i + 1) * 15

            eta = eta_prediction

            time = now + timedelta(
                minutes=eta
            )

            # --------------------------
            # Enterprise Growth Model
            # --------------------------

            services = min(
                spread + i,
                spread + 10
            )

            new_services = max(
                0,
                services - spread
            )


            impact = STAGE_IMPACT.get(
                stage_name,
                0.10
            )

            if impact >= 0.40:
                severity = "Critical"
            elif impact >= 0.25:
                severity = "High"
            elif impact >= 0.10:
                severity = "Medium"
            else:
                severity = "Low"


            growth = round(
                loss *
                impact *
                (
                    services /
                    max(spread, 1)
                ),
                2
            )

            accumulated_loss += growth

            estimated_loss = round(
                accumulated_loss,
                2
            )

            timeline.append({

                "time":
                    time.strftime("%H:%M"),

                "eta":
                    eta,

                "stage":
                    stage_name,

                
                "severity":
                    severity,

                "reason":
                    reasons.get(
                        stage_name,
                        "Predicted attack progression."
                    ),

                "probability":
                    probability,

                "eta_prediction":
                    eta_prediction,

                "affected_services":
                    services,

                "newly_affected":
                    new_services,

                "estimated_loss":
                    estimated_loss,

                "loss_growth":
                    round(
                        growth,
                        2
                    ),


            })

        return timeline