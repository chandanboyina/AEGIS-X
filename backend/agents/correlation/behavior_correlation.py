from collections import defaultdict

from agents.correlation.event_correlation_score import (
    EventCorrelationScore
)

from agents.correlation.attack_sequences import (
    ATTACK_SEQUENCES
)
from agents.correlation.campaign_risk import CampaignRisk


class BehaviorCorrelation:
    """
    Enterprise Behavior Correlation Engine

    Groups telemetry events into
    attack campaigns.
    """

    def __init__(self):

        self.score = EventCorrelationScore()

        self.risk = CampaignRisk()

    def analyze(
        self,
        events
    ):

        #
        # Group by Asset
        #

        groups = defaultdict(list)

        for event in events:

            asset = event.get(
                "asset",
                "Unknown"
            )

            groups[asset].append(
                event
            )

        campaigns = []

        #
        # Build Campaigns
        #

        for asset, asset_events in groups.items():

            asset_events.sort(

                key=lambda e:

                e.get(
                    "timestamp",
                    ""
                )

            )

            correlation = self.score.calculate(
                asset_events
            )

            campaigns.append(

                self.build_campaign(

                    asset,

                    asset_events,

                    correlation

                )

            )

        return campaigns
    
    
    def build_campaign(

        self,

        asset,

        events,

        correlation

    ):

        categories = [

            event.get(

                "category",

                "Unknown"

            )

            for event in events

        ]

        attack = self.detect_attack(
            categories
        )

        users = sorted(

            {

                event.get("user")

                for event in events

                if event.get("user")

            }

        )

        campaign = {

            "asset": asset,

            "attack": attack["name"],

            "severity": attack["severity"],

            "confidence": correlation["score"],

            "reasons": correlation["reasons"],

            "timeline": events,

            "users": users,

            "event_count": len(events)

        }

        campaign["risk"] = self.risk.evaluate(
            campaign
        )

        return campaign

    
    def detect_attack(
        self,
        categories
    ):

        timeline = [

            c

            for c in categories

            if c != "Unknown"

        ]

        best = None

        longest = 0

        for attack in ATTACK_SEQUENCES:

            if self.matches(

                attack["sequence"],

                timeline

            ):

                if len(attack["sequence"]) > longest:

                    longest = len(

                        attack["sequence"]

                    )

                    best = attack

        if best:

            return {

                "name":

                    best["name"],

                "severity":

                    best["severity"]

            }

        return {

            "name":

                "Unknown Activity",

            "severity":

                "Low"

        }
    
    def matches(

        self,

        expected,

        observed

    ):

        """
        Returns True if the expected
        attack sequence appears
        in order.
        """

        i = 0

        for category in observed:

            if category == expected[i]:

                i += 1

                if i == len(expected):

                    return True

        return False