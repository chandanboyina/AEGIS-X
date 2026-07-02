'''
from agents.commander.time_machine.campaign_predictor import CampaignPredictor

predictor = CampaignPredictor()

campaign = predictor.predict(

    "Credential Access"

)

print()

print("="*65)

print("CAMPAIGN PREDICTOR")

print("="*65)

print()

for stage in campaign:

    print(

        f"{stage['from']}"

        f"  --->  "

        f"{stage['to']}"

        f" ({stage['probability']}%)"

    )
'''