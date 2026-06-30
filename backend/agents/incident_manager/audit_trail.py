from datetime import datetime, timedelta


class AuditTrail:
    """
    Enterprise audit log.
    """

    def build(self, packet, incident):

        created = datetime.strptime(

            incident["created"],

            "%Y-%m-%d %H:%M:%S"

        )

        events = [

            ("Oracle AI", "Threat Investigation"),

            ("MITRE Mapper", "Technique Mapping"),

            ("Sentinel AI", packet["sentinel"]["action"]),

            ("Incident Manager", "Case Created"),

            ("Analyst", "Investigation Started"),

            ("Recovery Engine", "Recovery Started")

        ]

        trail = []

        for i, (source, action) in enumerate(events):

            trail.append({

                "time":

                    (

                        created +

                        timedelta(seconds=i)

                    ).strftime("%H:%M:%S"),

                "source": source,

                "action": action,

                "status": "SUCCESS"

            })

        return trail