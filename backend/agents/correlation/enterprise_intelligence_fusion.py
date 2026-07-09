class IntelligenceFusion:
    """
    Enterprise Intelligence Fusion Engine.

    Combines all AI engines into
    one enterprise intelligence object.
    """

    def fuse(

        self,

        threat=None,

        behavior=None,

        campaign=None,

        ueba=None,

        cyber_dna=None,

        business=None,

        enterprise=None

    ):

        threat = threat or {}

        behavior = behavior or {}

        campaign = campaign or {}

        ueba = ueba or {}

        cyber_dna = cyber_dna or {}

        business = business or {}

        enterprise = enterprise or {}

        #
        # Overall Risk
        #

        overall = self.overall_risk(

            campaign,

            enterprise,

            business,

            ueba,

            cyber_dna

        )

        return {

            "threat":

                threat,

            "behavior":

                behavior,

            "campaign":

                campaign,

            "ueba":

                ueba,

            "cyber_dna":

                cyber_dna,

            "business":

                business,

            "enterprise":

                enterprise,

            "overall_risk":

                overall,

            "priority":

                self.priority(overall),

            "recommended_action":

                self.recommendation(

                    overall

                )

        }
    
    def overall_risk(
        self,
        campaign,
        enterprise,
        business,
        ueba,
        cyber_dna
    ):

        scores = []

        #
        # Campaign
        #

        if campaign:

            scores.append(

                campaign["risk"]["risk"]

            )

        #
        # Enterprise
        #

        if enterprise:

            scores.append(

                enterprise.get(

                    "enterprise_score",

                    50

                )

            )

        #
        # Business
        #

        if business:

            scores.append(

                business.get(

                    "confidence",

                    50

                )

            )

        #
        # UEBA
        #

        if ueba:

            scores.append(

                ueba.get(

                    "confidence",

                    50

                )

            )

        #
        # Cyber DNA
        #

        if cyber_dna:

            scores.append(

                cyber_dna.get(

                    "similarity",

                    50

                )

            )

        if not scores:

            return 0

        return round(

            sum(scores)

            /

            len(scores)

        )
    
    def priority(
        self,
        score
    ):

        if score >= 90:

            return "P1"

        if score >= 75:

            return "P2"

        if score >= 50:

            return "P3"

        return "P4"
    
    def recommendation(

        self,

        score

    ):

        if score >= 90:

            return "Immediate Isolation"

        if score >= 75:

            return "Aggressive Containment"

        if score >= 50:

            return "Contain and Monitor"

        return "Monitor"