from simulation.enterprise_pipeline import EnterprisePipeline
import pprint

pipeline = EnterprisePipeline()

for packet in pipeline.run_live():

    if packet["oracle"]["category"] == "Normal":
        continue

    print(packet["incident"]["incident_id"])

    break

    pprint.pp(packet.keys())

    print("\n================ INCIDENT ================")

    pprint.pp(packet.get("incident"))

    break