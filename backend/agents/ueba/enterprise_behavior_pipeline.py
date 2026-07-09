from agents.ueba.current_activity_builder import CurrentActivityBuilder
from agents.ueba.ai_behavior_engine import AIBehaviorEngine


class EnterpriseBehaviorPipeline:

    def __init__(self):

        self.builder = CurrentActivityBuilder()

        self.engine = AIBehaviorEngine()

    def analyze(self, events):

        snapshot = self.builder.build(events)

        results = []

        for event in events:

            results.append(

                self.engine.analyze(

                    event,

                    snapshot

                )

            )

        return results