from collections import defaultdict

from agents.oracle.attack_chain_builder import AttackChainBuilder
from agents.oracle.timeline_generator import TimelineGenerator
from agents.oracle.incident_report import IncidentReport


class IncidentCorrelation:
    """
    Correlates Oracle AI incidents into attack campaigns.
    """

    def __init__(self):

        self.builder = AttackChainBuilder()

        self.timeline = TimelineGenerator()

        self.report = IncidentReport()

    def correlate(self, packets):

        campaigns = defaultdict(list)

        # Group incidents by Asset + Threat Category
        for packet in packets:

            oracle = packet["oracle"]

            key = (
                packet["asset"]["hostname"],
                oracle["category"],
            )

            campaigns[key].append(packet)

        correlated_campaigns = []

        campaign_number = 1

        for (asset, category), events in campaigns.items():

            campaign = {

                "campaign_id":
                    f"AC-{campaign_number:04d}",

                "asset":
                    asset,

                "category":
                    category,

                "event_count":
                    len(events),

                "events":
                    events,

            }

            # Build attack chain
            campaign = self.builder.build(
                campaign
            )

            # Build timeline
            campaign = self.timeline.build(
                campaign
            )
            
            campaign["report"] = self.report.generate(
                campaign
            )

            correlated_campaigns.append(
                campaign
            )

            campaign_number += 1

        return correlated_campaigns