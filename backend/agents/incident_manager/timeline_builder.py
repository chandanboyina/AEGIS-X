from datetime import datetime, timedelta


class TimelineBuilder:

    def build(self, incident):

        created = datetime.strptime(
            incident["created"],
            "%Y-%m-%d %H:%M:%S"
        )

        events = [

            "🟢 Event Generated",

            "🔍 Oracle Investigation",

            "🛡 MITRE Mapping",

            "⚡ Sentinel Response",

            "📁 Incident Created",

            "♻ Recovery Started"

        ]

        timeline = []

        for seconds, event in enumerate(events):

            timeline.append({

                "time": (
                    created +
                    timedelta(seconds=seconds)
                ).strftime("%Y-%m-%d %H:%M:%S"),

                "title": event

            })

        return timeline