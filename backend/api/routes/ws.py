from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from core.websocket_manager import manager

router = APIRouter()


@router.websocket("/ws/dashboard")

async def dashboard_socket(
    websocket: WebSocket
):

    await manager.connect(
        websocket
    )

    try:

        while True:

            #
            # Keep connection alive.
            #
            await websocket.receive()

    except WebSocketDisconnect:

        manager.disconnect(
            websocket
        )

    except Exception:

        manager.disconnect(
            websocket
        )