from collectors.dns.dns_events import DNS_EVENTS
from collectors.dns.dns_features import DNSFeatures
from collectors.dns.dns_health import DNSHealth
from collectors.dns.dns_risk import DNSRisk
from collectors.dns.dns_threat import DNSThreat


class DNSParser:

    def __init__(self):

        self.features = DNSFeatures()

        self.health = DNSHealth()

        self.risk = DNSRisk()

        self.threat = DNSThreat()

    def parse(self, log):

        info = DNS_EVENTS.get(

            log["event_id"],

            {

                "event_name": log["event"],

                "category": "Unknown",

                "severity": log["severity"],

                "risk_score": 30,

                "confidence": 30,

                "mitre": {

                    "technique": "Unknown",

                    "tactic": "Unknown"

                }

            }

        )

        data = log.get(

            "event_data",

            {}

        )

        dns = {

            "query":

                data.get(

                    "QueryName",

                    ""

                ),

            "query_type":

                data.get(

                    "QueryType",

                    ""

                ),

            "status":

                data.get(

                    "QueryStatus",

                    ""

                ),

            "results":

                data.get(

                    "QueryResults",

                    ""

                )

        }

        features = self.features.extract(

            dns

        )

        behavior = self.health.evaluate(

            features

        )

        risk = self.risk.calculate(

            behavior

        )

        threat = self.threat.classify(

            features

        )

        return {

            "timestamp":

                log["timestamp"],

            "collector":

                "DNS",

            "source":

                log["source"],

            "asset":

                log["asset"],

            "hostname":

                log.get(

                    "computer",

                    log["asset"]

                ),

            "event":

                info["event_name"],

            "event_id":

                log["event_id"],

            "category":

                info["category"],

            "severity":

                info["severity"],

            "risk_score":

                info["risk_score"],

            "confidence":

                info["confidence"],

            "dns":

                dns,

            "dns_features":

                features,

            "dns_behavior":

                behavior,

            "dns_risk":

                risk,

            "dns_threat":

                threat,

            "mitre":

                info["mitre"],

            "raw":

                log

        }