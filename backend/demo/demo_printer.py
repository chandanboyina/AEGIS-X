"""
===========================================================
AEGIS-X Demo Printer

Provides professional console output for the hackathon demo.

Author : AEGIS-X
===========================================================
"""

import time
from datetime import datetime


class DemoPrinter:

    LINE = "=" * 80
    SMALL_LINE = "-" * 80

    @staticmethod
    def title(title: str):
        print("\n")
        print(DemoPrinter.LINE)
        print(title.center(80))
        print(DemoPrinter.LINE)

    @staticmethod
    def section(title: str):
        print("\n")
        print(DemoPrinter.SMALL_LINE)
        print(title)
        print(DemoPrinter.SMALL_LINE)

    @staticmethod
    def success(message: str):
        print(f"[SUCCESS] {message}")

    @staticmethod
    def info(message: str):
        print(f"[INFO] {message}")

    @staticmethod
    def warning(message: str):
        print(f"[WARNING] {message}")

    @staticmethod
    def error(message: str):
        print(f"[ERROR] {message}")

    @staticmethod
    def blank():
        print()

    @staticmethod
    def key_value(key, value):
        print(f"{key:<30}: {value}")

    @staticmethod
    def divider():
        print(DemoPrinter.SMALL_LINE)

    @staticmethod
    def pause(seconds=1):
        time.sleep(seconds)

    @staticmethod
    def stage(stage_name):
        print("\n")
        print(DemoPrinter.LINE)
        print(f" {stage_name}")
        print(DemoPrinter.LINE)

    @staticmethod
    def ai_result(agent, decision, confidence, priority):

        print()

        print(f"Agent        : {agent}")
        print(f"Decision     : {decision}")
        print(f"Confidence   : {confidence}%")
        print(f"Priority     : {priority}")

    @staticmethod
    def reasoning(lines):

        print("\nReasoning")

        for line in lines:
            print(f"  • {line}")

    @staticmethod
    def recommendation(action):

        print("\nRecommended Action")

        print(f"  -> {action}")

    @staticmethod
    def timer(milliseconds):

        print(f"\nProcessing Time : {milliseconds:.2f} ms")

    @staticmethod
    def vote(agent, recommendation, confidence):

        print(
            f"{agent:<20}"
            f"{recommendation:<20}"
            f"{confidence}%"
        )

    @staticmethod
    def council_header():

        print("\n")
        print(DemoPrinter.LINE)
        print("AI COUNCIL")
        print(DemoPrinter.LINE)

    @staticmethod
    def final_decision(
        playbook,
        risk,
        impact,
        confidence
    ):

        print("\n")
        print(DemoPrinter.LINE)
        print("FINAL ENTERPRISE DECISION")
        print(DemoPrinter.LINE)

        print(f"Recommended Playbook : {playbook}")
        print(f"Enterprise Risk      : {risk}")
        print(f"Business Impact      : {impact}")
        print(f"Overall Confidence   : {confidence}%")

    @staticmethod
    def footer():

        print("\n")
        print(DemoPrinter.LINE)
        print(
            "AEGIS-X Demonstration Completed Successfully"
        )
        print(DemoPrinter.LINE)