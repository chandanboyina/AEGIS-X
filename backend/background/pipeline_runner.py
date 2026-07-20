import asyncio
import logging
import traceback
from simulation.enterprise_pipeline import EnterprisePipeline
from core.packet_router import router

# Configure logger
logger = logging.getLogger("uvicorn")

class PipelineRunner:
    def __init__(self):
        self.pipeline = EnterprisePipeline()
        self.main_loop = None

    async def start(self):
        self.main_loop = asyncio.get_running_loop()
        logger.info("Pipeline Runner started.")
        
        # We try to run the pipeline once. If it crashes, it will log 
        # the full traceback and the loop will end (no flooding).
        try:
            logger.info("Starting pipeline execution...")
            await asyncio.to_thread(self._run_pipeline)
        except Exception:
            logger.critical("PIPELINE RUNNER CRITICAL ERROR - TERMINATING:")
            traceback.print_exc()
            # Loop stops here, preventing further logs
        
    def _run_pipeline(self):
        # This will execute the simulation
        for packet in self.pipeline.run_live():
            if self.main_loop:
                asyncio.run_coroutine_threadsafe(
                    router.publish(packet), 
                    self.main_loop
                )

# Initialize the runner
runner = PipelineRunner()