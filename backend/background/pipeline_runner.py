import asyncio
import logging
import traceback

from simulation.enterprise_pipeline import EnterprisePipeline
from core.packet_router import router

# Configure logger
logger = logging.getLogger("uvicorn")


class PipelineRunner:

    def __init__(self):

        self.pipeline = None
        self.main_loop = None

    async def start(self):

        # Store FastAPI's main event loop
        self.main_loop = asyncio.get_running_loop()

        # Create pipeline AFTER event loop is available
        self.pipeline = EnterprisePipeline(
            loop=self.main_loop
        )

        logger.info("Pipeline Runner started.")

        try:

            logger.info("Starting pipeline execution...")

            await asyncio.to_thread(
                self._run_pipeline
            )

        except Exception:

            logger.critical(
                "PIPELINE RUNNER CRITICAL ERROR - TERMINATING:"
            )

            traceback.print_exc()

    def _run_pipeline(self):

        # Execute enterprise simulation

        for packet in self.pipeline.run_live():

            if self.main_loop:

                asyncio.run_coroutine_threadsafe(

                    router.publish(packet),

                    self.main_loop

                )
  
    def get_pipeline(self):
        """
        Returns the running Enterprise Pipeline instance.
        """

        if self.pipeline is None:
            raise RuntimeError(
                "Enterprise Pipeline has not been initialized yet."
            )

        return self.pipeline

# Singleton instance
runner = PipelineRunner()