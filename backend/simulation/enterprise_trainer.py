from agents.observer.observer_agent import ObserverAgent

from simulation.event_generator import EnterpriseEventGenerator

from ai.evidence.evidence_builder import EvidenceBuilder
from ai.context.context_engine import ContextEngine
from ai.behavior.feature_engine import FeatureEngine


class EnterpriseTrainer:
    """
    Trains Observer AI using realistic
    enterprise business activity.
    """

    def __init__(self):

        self.generator = EnterpriseEventGenerator()

        self.observer = ObserverAgent()

    def train(self, samples=500):

        print("\n========== ENTERPRISE TRAINING ==========\n")

        for i in range(samples):

            generated = self.generator.generate_normal_event()

            asset = generated["asset"]

            event = generated.copy()

            event.pop("asset")

            packet = EvidenceBuilder.build(
                event,
                asset
            )

            packet = ContextEngine.enrich(packet)

            packet = FeatureEngine.extract(packet)

            self.observer.learn(packet)

            if (i + 1) % 100 == 0:

                print(
                    f"Learned {i+1} events..."
                )

        print("\nTraining Isolation Forest...\n")

        self.observer.train()

        print("Enterprise training completed.\n")

        return self.observer