from simulation.enterprise_pipeline import EnterprisePipeline

from agents.oracle.oracle_agent import OracleAgent
from agents.sentinel.sentinel_agent import SentinelAgent
from agents.incident_manager.incident_manager import IncidentManager

from agents.incident_manager.incident_repository import IncidentRepository
from agents.incident_manager.threat_hunter import ThreatHunter
from agents.incident_manager.hunt_summary import HuntSummary
from agents.incident_manager.hunt_report import HuntReport


pipeline = EnterprisePipeline()

oracle = OracleAgent()

sentinel = SentinelAgent()

manager = IncidentManager()

hunter = ThreatHunter()

summary_builder = HuntSummary()

report_builder = HuntReport()


# =====================================================
# IOC Helper Functions
# =====================================================

def get_first_ioc(ioc_type):

    for incident in IncidentRepository.incidents:

        for ioc in incident["ioc_list"]:

            if ioc["type"] == ioc_type:

                return ioc["value"]

    return None


def get_first_hash():

    for incident in IncidentRepository.incidents:

        for ioc in incident["ioc_list"]:

            if ioc["type"] in [

                "MD5",

                "SHA1",

                "SHA256"

            ]:

                return ioc["value"]

    return None


# =====================================================
# Enterprise Hunt Display
# =====================================================

def run_hunt(title, query, matches):

    summary = summary_builder.build(
        query,
        matches
    )

    report = report_builder.build(
        matches
    )

    print()
    print("=" * 70)
    print(title)
    print("=" * 70)

    print()

    print("Threat Hunting Summary")
    print("----------------------------------------")

    print(f"Query              : {summary['query']}")
    print(f"Matches            : {summary['matches']}")
    print(f"Search Time        : {summary['search_time']}")
    print(
    f"Repository Size    : "
    f"{summary['repository_size']} Incidents"
    )
    print(f"Affected Assets    : {summary['assets']}")
    print(f"Affected Users     : {summary['users']}")
    print(
        f"Shared Users       : "
        f"{summary['shared_users']}"
    )
    print(
        f"Potential Campaign : "
        f"{summary['potential_campaign']}"
    )
    print(
    f"Campaign Confidence : "
    f"{summary['campaign_confidence']}"
    )
    print(f"Highest Severity   : {summary['highest_severity']}")
    print(f"MITRE Techniques   : {summary['mitre']}")
    print(f"Recommendation     : {summary['recommendation']}")

    print()

    print(

    f"Threat Hunting Report "

    f"({len(report)} Results)"

    )
    print("----------------------------------------")

    if len(report) == 0:
        print("No matching incidents found.")
        return
    severity_order = {

        "CRITICAL": 1,

        "HIGH": 2,

        "MEDIUM": 3

    }

    report.sort(

        key=lambda x: (
            severity_order[x["severity"]],
            -int(
                x["incident"].split("-")[1]
            )
        )
    )

    for item in report:

        print(f"Incident ID : {item['incident']}")
        print(f"Asset       : {item['asset']}")
        print(f"Category    : {item['category']}")
        icons = {

            "CRITICAL": "🔴",

            "HIGH": "🟠",

            "MEDIUM": "🟡"

        }

        print(

            f"Severity    : "

            f"{icons[item['severity']]} "

            f"{item['severity']}"
        )

        print(

        f"Risk Score  : "

        f"{item['risk_score']}/100"

        )
        print("MITRE ATT&CK")
        print("------------------------------")

        print(f"Tactic        : {item['tactic']}")
        print(f"Technique     : {item['technique']}")
        print(f"Technique ID  : {item['mitre_id']}")
        print("-" * 40)


# ----------------------------------------
# Generate Incidents
# ----------------------------------------

IncidentRepository.incidents.clear()

for packet in pipeline.run_live():

    packet = oracle.investigate(packet)

    if packet["oracle"]["category"] == "Normal":
        continue

    packet = sentinel.respond(packet)

    packet = manager.create(packet)

print()
print("=" * 70)
print("ENTERPRISE THREAT HUNTING")
print("=" * 70)

print()

print(f"Incidents Loaded : {len(IncidentRepository.incidents)}")


# ----------------------------------------
# Hunt by Source IP
# ----------------------------------------

query = get_first_ioc("Source IP")

matches = hunter.search_by_ip(query)
run_hunt(

    "HUNT BY SOURCE IP",

    query,

    matches

)




username = get_first_ioc("Username")
if username:

    run_hunt(

        "HUNT BY USERNAME",

        username,

        hunter.search_by_username(username)

    )

domain = get_first_ioc("Domain")

if domain:

    run_hunt(

        "HUNT BY DOMAIN",

        domain,

        hunter.search_by_domain(domain)

    )


url = get_first_ioc("URL")

if url:

    run_hunt(

        "HUNT BY URL",

        url,

        hunter.search_by_url(url)

    )


registry = get_first_ioc("Registry Path")
if registry:

    run_hunt(

        "HUNT BY REGISTRY PATH",

        registry,

        hunter.search_by_registry(registry)

    )


hash_value = get_first_hash()
if hash_value:

    run_hunt(

        "HUNT BY FILE HASH",

        hash_value,

        hunter.search_by_hash(hash_value)

    )


hostname = IncidentRepository.incidents[0]["asset"]

run_hunt(

    "HUNT BY HOSTNAME",

    hostname,

    hunter.search_by_hostname(hostname)

)


mitre = IncidentRepository.incidents[0]["mitre"]["id"]

run_hunt(

    "HUNT BY MITRE TECHNIQUE",

    mitre,

    hunter.search_by_mitre(mitre)

)

category = IncidentRepository.incidents[0]["category"]



run_hunt(

    "HUNT BY CATEGORY",

    category,

    hunter.search_by_category(category)

)

