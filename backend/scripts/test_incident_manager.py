from simulation.enterprise_pipeline import EnterprisePipeline

from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.incident_manager.incident_manager import IncidentManager


pipeline = EnterprisePipeline()

oracle = OracleAgent()

sentinel = SentinelAgent()

manager = IncidentManager()


print()
print("=" * 70)
print("INCIDENT MANAGER")
print("=" * 70)


for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    # Skip normal events
    if packet["oracle"]["category"] == "Normal":
        continue

    packet = sentinel.respond(packet)

    packet = manager.create(packet)

    report = packet["incident_report"]

    print()

    print("-" * 70)

    print(f"Incident ID : {report['incident_id']}")
    print(f"Asset       : {report['asset']}")
    print(f"Category    : {report['category']}")
    print(f"Severity    : {report['severity']}")
    print(f"Status      : {report['status']}")
    print(f"Next Status : {report['next_status']}")
    print(f"Assigned Team  : {report['assigned_team']}")
    print(f"Incident Owner : {report['assigned_owner']}")
    print(f"Created     : {report['created']}")

    print()

    print("History")
    print("----------------------------------------")

    for item in report["history"]:

        print(f"{item['stage']} : {item['message']}")

    print()

    print("Case")
    print("----------------------------------------")

    case = report["case"]

    print(f"Case ID        : {case['case_id']}")
    print(f"Owner          : {case['owner']}")
    print(f"Team           : {case['team']}")
    print(f"Status         : {case['status']}")

    print()

    print("Case Notes")
    print("----------------------------------------")

    for note in report["case_notes"]:

        print(f"{note['author']} : {note['note']}")

    print()

    print("Evidence")
    print("----------------------------------------")

    for item in report["evidence"]:

        print(f"• {item}")

    print()

    print("Tags")
    print("----------------------------------------")

    for tag in report["tags"]:

        print(f"• {tag}")

    print()
    print("Timeline")
    print("----------------------------------------")

    for event in report["timeline"]:

        print(f"{event['time']}")

        print(f"   {event['title']}")

        print()

    print("Analyst Actions")
    print("----------------------------------------")

    for action in report["analyst_actions"]:

        print(f"✓ {action}")

    print()
    print("Evidence Chain")
    print("----------------------------------------")

    for item in report["evidence_chain"]:

        print(item["name"])

        print(f"   Collector : {item['collector']}")
        print(f"   Time      : {item['time']}")
        print(f"   SHA256    : {item['sha256']}")
        print(f"   Storage   : {item['storage']}")
        print(f"   Integrity : {item['integrity']}")
        print(f"   Status    : {item['status']}")
        print()

    print("Activity Feed")
    print("----------------------------------------")

    for item in report["activity_feed"]:

        print(
            f"{item['time']} "
            f"[{item['type']}] "
            f"{item['message']}"
        )

    

    mitre = report["mitre"]

    print()
    print("MITRE ATT&CK")
    print("----------------------------------------")
    print(f"Tactic       : {mitre['tactic']}")
    print(f"Technique    : {mitre['technique']}")
    print(f"Technique ID : {mitre['id']}")
    print(f"Confidence   : {report['mitre_confidence']}%")

    print()
   
    print("Attack Chain")
    print("----------------------------------------")

    for stage in report["attack_chain"]:

        print(f"✓ {stage['stage']}")
    
    print()

    print("IOC List")
    print("----------------------------------------")

    for ioc in report["ioc_list"]:

        print(ioc["type"])

        print(f"   Value      : {ioc['value']}")

        if "confidence" in ioc:

            print(f"   Confidence : {ioc['confidence']}")

        if "reputation" in ioc:

            print(f"   Reputation : {ioc['reputation']}")

        print()

    print()
    print("Recovery Status")
    print("----------------------------------------")

    recovery = report["recovery_status"]

    print(f"Overall Status : {recovery['status']}")
    print(f"Systems        : {recovery['systems']}")
    print(f"Integrity      : {recovery['integrity']}")
    print(f"Business       : {recovery['business']}")

    summary = report["investigation_summary"]

    print()
    print("Investigation Summary")
    print("----------------------------------------")
    print(f"Risk Score      : {summary['risk_score']}/100")
    print(f"Confidence      : {summary['confidence']}")
    print(f"MITRE Stage     : {summary['mitre_stage']}")
    print(f"Affected Users  : {summary['affected_users']}")
    print(f"Affected Assets : {summary['affected_assets']}")
    print(f"IOCs Found      : {summary['ioc_count']}")
    print()

    print("IOC Types")

    for item in summary["ioc_types"]:

        print(f"   • {item}")


    print()
    print("Analyst Comments")
    print("----------------------------------------")

    for comment in report["analyst_comments"]:

        print(f"[{comment['time']}]")

        print(comment["author"])

        print(comment["comment"])

        print()

    print("Tasks")
    print("----------------------------------------")

    for task in report["tasks"]:

        status = "✓" if task["status"] == "COMPLETED" else "□"

        print(f"{status} {task['task']}")

        print(f"   Owner    : {task['owner']}")

        print(f"   Priority : {task['priority']}")

        print(f"   Status   : {task['status']}")

        print()

    approval = report["approval"]

    print("Approval")
    print("----------------------------------------")

    if approval["required"]:

        print(f"Action       : {approval['action']}")

        print(f"Requested By : {approval['requested_by']}")

        print(f"Approver     : {approval['approver']}")

        icons = {

            "APPROVED": "🟢",

            "PENDING": "🟡",

            "REJECTED": "🔴"

        }

        print(

            f"Status       : "

            f"{icons[approval['status']]} "

            f"{approval['status']}"

        )

        print(f"Next Action : {approval['next_action']}")

    else:

        print("No approval required.")

    print()


    esc = report["escalation"]

    print("Escalation")
    print("----------------------------------------")

    print(f"Current Team : {esc['current_team']}")

    print(f"Escalated To : {esc['escalated_to']}")

    print(f"Reason       : {esc['reason']}")

    print(f"Status       : {esc['status']}")

    print()

    sla = report["sla"]

    print("SLA")
    print("----------------------------------------")

    print(f"Priority        : {sla['priority']}")

    print(f"Target Response : {sla['target']}")

    print(f"Elapsed Time    : {sla['elapsed']}")

    print(f"Remaining Time  : {sla['remaining']}")

    icons = {

        "ON TRACK": "🟢",

        "AT RISK": "🟡",

        "BREACHED": "🔴"

    }

    print(

        f"Status          : "

        f"{icons[sla['status']]} "

        f"{sla['status']}"

    )

    print()


    print("Notifications")
    print("----------------------------------------")

    for person in report["notifications"]:

        print(person["recipient"])

        

        print(f"   Channel : {person['channel']}")

        icon = "📨"

        if person["status"] == "Pending":

            icon = "⌛"

        print(

            f"   Status  : "

            f"{icon} "

            f"{person['status']}"

        )

        print(f"   Delivered : {person['delivered_at']}")

        print()


    print("Audit Trail")
    print("----------------------------------------")

    for item in report["audit_trail"]:

        print(f"[{item['time']}]")

        print(item["source"])

        print(item["action"])

        print(

            f"Status : "

            f"{item['status']}"

        )

        print()


    metrics = report["case_metrics"]

    print("Case Metrics")
    print("----------------------------------------")

    print(f"Evidence Items    : {metrics['evidence_items']}")
    print(f"Recovered Systems : {metrics['recovered_systems']}")
    print(f"Affected Assets   : {metrics['affected_assets']}")
    print(f"Affected Users    : {metrics['affected_users']}")
    print(f"Analyst Actions   : {metrics['analyst_actions']}")
    print(f"Elapsed Time      : {metrics['elapsed_time']}")
    print(f"Current Phase     : {metrics['current_phase']}")

    print()


print()
print("=" * 70)
print("ENTERPRISE IOC REPOSITORY")
print("=" * 70)

from agents.incident_manager.ioc_manager import IOCManager

# ----------------------------------------
# Sort by Risk Level
# ----------------------------------------

risk_order = {

    "🔴 Critical": 1,

    "🟠 High": 2,

    "🟡 Medium": 3,

    "🟢 Low": 4

}

sorted_iocs = sorted(

    IOCManager.repository,

    key=lambda x: (

        risk_order.get(x["risk"], 99),

        x["type"],

        x["value"]

    )

)

# Statistics
total = 0

for item in IOCManager.repository:
    total += item["incidents"]

unique = len(IOCManager.repository)

duplicates = total - unique

print()
print("IOC Statistics")
print("----------------------------------------")
print(f"Total IOCs      : {total}")
print(f"Unique IOCs     : {unique}")
print(f"Duplicate IOCs  : {duplicates}")

print()
print("IOC Repository")
print("----------------------------------------")

for index, ioc in enumerate(sorted_iocs, start=1):

    print("=" * 60)

    print(f"IOC #{index}")

    print("=" * 60)

    print(f"Type        : {ioc['type']}")

    print(f"Value       : {ioc['value']}")

    print(f"First Seen  : {ioc['first_seen']}")

    print(f"Last Seen   : {ioc['last_seen']}")

    print(f"Incidents   : {ioc['incidents']}")

    print(f"Confidence  : {ioc['confidence']}")

    print(f"Reputation  : {ioc['reputation']}")

    print(f"Risk Level  : {ioc['risk']}")

    print()