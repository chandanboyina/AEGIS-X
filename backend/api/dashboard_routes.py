from fastapi import FastAPI
from api.routes.dashboard import router as dashboard_router
from api.routes.council import router as council_router
from api.routes.metrics import router as metrics_router
from api.routes.timeline import router as timeline_router
from api.routes.topology import router as topology_router
from api.routes.ws import router as websocket_router
from api.routes.cache import router as cache_router
from api.routes.enterprise import router as enterprise_router

def register_dashboard_routes(app: FastAPI):

    app.include_router(dashboard_router)

    app.include_router(council_router)

    app.include_router(metrics_router)

    app.include_router(timeline_router)

    app.include_router(topology_router)

    app.include_router(websocket_router)

    app.include_router(cache_router)

    app.include_router(enterprise_router)