from simulation.event_generator import EnterpriseEventGenerator
from pprint import pprint

gen = EnterpriseEventGenerator()

print("\n========== Credential Attack ==========\n")
pprint(gen.generate_credential_attack())

print("\n========== Malware ==========\n")
pprint(gen.generate_malware_event())

print("\n========== Ransomware ==========\n")
pprint(gen.generate_ransomware_event())