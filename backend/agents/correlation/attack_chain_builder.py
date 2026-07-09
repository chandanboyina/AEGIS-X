SEVERITY_ORDER = {

    "Info": 1,
    "Low": 2,
    "Medium": 3,
    "High": 4,
    "Critical": 5,

    "INFO": 1,
    "LOW": 2,
    "MEDIUM": 3,
    "HIGH": 4,
    "CRITICAL": 5

}

class AttackChainBuilder:
    """
    Enterprise Attack Chain Builder.

    Builds attack chains from attack sessions.
    """

    def highest_severity(self, severities):

        highest = "Info"

        for severity in severities:

            if (

                SEVERITY_ORDER.get(severity, 0)

                >

                SEVERITY_ORDER.get(highest, 0)

            ):

                highest = severity

        return highest

    def build(self, sessions):

        chains = []

        for session in sessions:

            #
            # Merge events from all timelines
            #

            events = []

            for timeline in session["timelines"]:

                events.extend(

                    timeline["events"]

                )

            #
            # Chronological order
            #

            events.sort(

                key=lambda e:

                    e["event"].get(

                        "timestamp",

                        ""

                    )

            )


            attack_chain = []

            mitre = []

            categories = []

            severities = []

            last_source = None

            risk = 0

            confidence = 0

            for event in events:

                #
                # Collector chain
                #

                source = event["source"]

                if source != last_source:

                    attack_chain.append(source)

                    last_source = source

                #
                # MITRE
                #

                technique = (

                    event["event"]

                    .get("mitre", {})

                    .get("technique")

                )

                if (

                    technique

                    and

                    technique not in [

                        "Unknown",

                        None,

                        ""

                    ]

                ):

                    if technique not in mitre:

                        mitre.append(

                            technique

                        )

                #
                # Category
                #

                category = event["event"].get(

                    "category"

                )

                if category:

                    categories.append(category)

                #
                # Severity
                #

                severity = event["event"].get(

                    "severity"

                )

                if severity:

                    severities.append(

                        severity

                    )

                #
                # Risk
                #

                risk += event["risk"]

                confidence += event["event"].get(

                    "confidence",

                    50

                )

            total = len(events)

            if total == 0:

                continue

            categories = [

                c

                for c in dict.fromkeys(categories)

                if c != "Unknown"

            ]

            if not categories:

                categories = ["Unknown"]

            chains.append({

                "host":

                    session["host"],

                "events":

                    total,

                "timelines":

                    len(session["timelines"]),

                "attack_chain":

                    attack_chain,

                "categories": categories,

                "severity":

                    self.highest_severity(

                        severities

                    ),

                "risk":

                    round(

                        risk / total

                    ),

                "confidence":

                    round(

                        confidence / total

                    ),

                "mitre":

                    mitre,

                "normalized_events": events

            })

        chains.sort(

            key=lambda c: (

                c["risk"],

                c["confidence"]

            ),

            reverse=True

        )

        return chains