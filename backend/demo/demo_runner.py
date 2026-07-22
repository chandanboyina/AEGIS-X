"""
===========================================================
AEGIS-X Demo Runner

Runs the complete Enterprise AI Pipeline
and prints professional demo output.

Author : AEGIS-X
===========================================================
"""

import time

from simulation.enterprise_pipeline import EnterprisePipeline
from demo.demo_printer import DemoPrinter


class DemoRunner:

    def __init__(self):

        self.pipeline = EnterprisePipeline()

    def run(self):

        DemoPrinter.title(
            "AEGIS-X Enterprise Cyber Resilience Platform"
        )

        DemoPrinter.info(
            "Initializing Enterprise AI Pipeline..."
        )

        DemoPrinter.pause(1)

        start = time.perf_counter()

        packet_count = 0

        for packet in self.pipeline.run_live():

            packet_count += 1

            self.print_packet(packet)

        end = time.perf_counter()

        DemoPrinter.section("Pipeline Summary")

        DemoPrinter.key_value(
            "Packets Processed",
            packet_count
        )

        DemoPrinter.key_value(
            "Execution Time",
            f"{end-start:.2f} seconds"
        )

        DemoPrinter.footer()

    def print_packet(self, packet):

        DemoPrinter.stage(
            f"Incident #{packet.get('incident',{}).get('incident_id','N/A')}"
        )

        asset = packet.get("asset", {})

        event = packet.get("event", {})

        observer = packet.get("observer", {})

        oracle = packet.get("oracle", {})

        sentinel = packet.get("sentinel", {})

        incident = packet.get("incident", {})

        commander = incident.get(
            "commander",
            {}
        )

        DemoPrinter.section(
            "Enterprise Asset"
        )

        DemoPrinter.key_value(
            "Hostname",
            asset.get("hostname","-")
        )

        DemoPrinter.key_value(
            "IP Address",
            asset.get("ip","-")
        )

        DemoPrinter.key_value(
            "Criticality",
            asset.get("criticality","-")
        )

        DemoPrinter.section(
            "Event Information"
        )

        DemoPrinter.key_value(
            "Event Type",
            event.get("event_type","-")
        )

        DemoPrinter.key_value(
            "Severity",
            event.get("severity","-")
        )

        DemoPrinter.section(
            "Observer AI"
        )

        DemoPrinter.ai_result(

            "Observer AI",

            observer.get(
                "decision",
                "Unknown"
            ),

            observer.get(
                "confidence",
                0
            ),

            observer.get(
                "priority",
                "-"
            )

        )

        DemoPrinter.section(
            "Oracle AI"
        )

        DemoPrinter.ai_result(

            "Oracle AI",

            oracle.get(
                "category",
                "-"
            ),

            oracle.get(
                "confidence",
                0
            ),

            oracle.get(
                "priority",
                "-"
            )

        )

        DemoPrinter.section(
            "Sentinel AI"
        )

        DemoPrinter.ai_result(

            "Sentinel AI",

            sentinel.get(
                "recommended_action",
                "-"
            ),

            sentinel.get(
                "confidence",
                0
            ),

            sentinel.get(
                "priority",
                "-"
            )

        )

        DemoPrinter.section(
            "Commander AI"
        )

        DemoPrinter.key_value(

            "Playbook",

            commander.get(
                "recommended_playbook",
                "-"
            )

        )

        DemoPrinter.key_value(

            "Risk",

            commander.get(
                "enterprise_risk",
                "-"
            )

        )

        DemoPrinter.key_value(

            "Business Impact",

            commander.get(
                "business_impact",
                "-"
            )

        )

        council = commander.get(
            "ai_council",
            {}
        )

        if council:

            DemoPrinter.council_header()

            for vote in council.get(
                "votes",
                []
            ):

                DemoPrinter.vote(

                    vote.get(
                        "agent",
                        "-"
                    ),

                    vote.get(
                        "decision",
                        "-"
                    ),

                    vote.get(
                        "confidence",
                        0
                    )

                )

        DemoPrinter.divider()


if __name__ == "__main__":

    DemoRunner().run()