from simulation.enterprise_pipeline import EnterprisePipeline

from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent


pipeline = EnterprisePipeline()

oracle = OracleAgent()

sentinel = SentinelAgent()

print()
print("=" * 70)
print("SENTINEL AI")
print("=" * 70)

for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    # Skip normal Oracle investigations
    if packet["oracle"]["category"] == "Normal":
        continue

    #from pprint import pprint

    #pprint(packet)

    packet = sentinel.respond(packet)

    report = packet["sentinel_report"]

    print()

    print("-" * 70)

    print(f"Asset      : {report['asset']}")
    print(f"Threat     : {report['threat']}")
    print(f"Response   : {report['response']}")
    print(f"Priority   : {report['priority']}")
    print(f"Playbook   : {report['playbook']}")

    print("Actions")

    for action in report["playbook_actions"]:

        print(f"   • {action}")

    print("Workflow")
    print("----------------------------------------")

    for step in report["workflow"]:

        print(f"Step {step['step']}")

        print(f"   Action   : {step['action']}")

        print(f"   Status   : {step['status']}")

        print(f"   Duration : {step['duration']} sec")

        print()



    print("Containment")

    print("----------------------------------------")

    containment = report["containment"]

    # -----------------------------
    # Host Isolation
    # -----------------------------
    if containment["isolate_host"]:

        isolate = containment["isolate_host"]

        print("Isolate Host")
        print(f"   Status : {isolate['status']}")
        print(f"   Action : {isolate['action']}")
        print(f"   Target : {isolate['asset']}")
        print()

    # -----------------------------
    # Account Lock
    # -----------------------------
    if containment["lock_account"]:

        account = containment["lock_account"]

        print("Lock Account")
        print(f"   Status  : {account['status']}")
        print(f"   Action  : {account['action']}")
        print(f"   Account : {account['account']}")
        print()

    # -----------------------------
    # Network Block
    # -----------------------------
    if containment["block_ip"]:

        block = containment["block_ip"]

        print("Network Block")
        print(f"   Status : {block['status']}")
        print(f"   Action : {block['action']}")
        print(f"   IP     : {block['ip']}")
        print()

    # -----------------------------
    # Additional Containment
    # -----------------------------
    if containment["collect_memory"]:
        print("Collect Memory : YES")

    if containment["collect_disk"]:
        print("Collect Disk   : YES")

    if containment["disable_shares"]:
        print("Disable Shares : YES")

    print(f"Status     : {report['status']}")


    print("Recovery Workflow")
    print("----------------------------------------")

    for step in report["recovery_workflow"]:

        print(f"Step {step['step']}")
        print(f"   Action : {step['action']}")
        print(f"   Status : {step['status']}")
        print()

    print("Recovery Plan")

    for step in report["recovery"]:

        print(f"   • {step}")

    impact = report["business_impact"]

    print()
    print("Business Impact")
    print("----------------------------------------")
    print(f"Asset Criticality : {impact['criticality']}")
    print(f"Business Impact   : {impact['impact']}")
    print(f"Estimated Downtime: {impact['downtime']}")
    print(f"Recovery Priority : {impact['priority']}")

    print()
    print("Affected Services")

    for service in impact["affected_services"]:

        print(f"   • {service}")

    rollback = report["rollback"]

    if rollback:

        print("Rollback")
        print("----------------------------------------")

        for action in rollback:

            print(action["action"])
            print(f"   Target   : {action['target']}")
            print(f"   Status   : {action['status']}")
            print(f"   Duration : {action['duration']} sec")
            print()