import asyncio

from simulation.enterprise_pipeline import EnterprisePipeline

from core.enterprise_broadcaster import broadcaster


class PipelineRunner:

    def __init__(self):

        self.pipeline = EnterprisePipeline()

    async def start(self):

        while True:

            for packet in self.pipeline.run_live():

                if packet.get(
                    "completed"
                ):

                    await broadcaster.publish(
                        packet
                    )

            await asyncio.sleep(
                2
            )


runner = PipelineRunner()