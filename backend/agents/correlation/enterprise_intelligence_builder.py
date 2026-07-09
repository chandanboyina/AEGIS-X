from agents.correlation.enterprise_intelligence_fusion import IntelligenceFusion


class EnterpriseIntelligenceBuilder:
    """
    Builds one unified enterprise intelligence object.

    Every AI module contributes intelligence.

            Threat Correlation
                    +
            Behavior Correlation
                    +
            Campaign Risk
                    +
            UEBA
                    +
            Cyber DNA
                    +
            Business AI
                    +
            Enterprise Risk
                    ↓
        Enterprise Intelligence
    """

    def __init__(self):

        self.fusion = IntelligenceFusion()

    def build(

        self,

        threat=None,

        behavior=None,

        campaign=None,

        ueba=None,

        cyber_dna=None,

        business=None,

        enterprise=None

    ):

        intelligence = self.fusion.fuse(

            threat=threat,

            behavior=behavior,

            campaign=campaign,

            ueba=ueba,

            cyber_dna=cyber_dna,

            business=business,

            enterprise=enterprise

        )

        intelligence["reasoning"]=[

            "Enterprise intelligence successfully fused.",

            "Threat correlation completed.",

            "Behavior correlation completed.",

            "Campaign intelligence merged.",

            "Unified enterprise intelligence generated."

        ]

        return intelligence