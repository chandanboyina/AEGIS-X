from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from core.websocket_manager import manager
import logging

logger = logging.getLogger("uvicorn")
router = APIRouter()

@router.websocket("/dashboard")
async def dashboard_socket(websocket: WebSocket):
    """
    Handles live telemetry stream.
    """
    await manager.connect(websocket)
    logger.info(f"WebSocket connected. Total clients: {manager.connection_count()}")
    
    # Send an initial welcome message to confirm the connection is active
    await websocket.send_json({"type": "connection_confirmed", "status": "ready"})
    
    try:
        while True:
            # Keep connection alive and listen for heartbeat
            data = await websocket.receive_text()
            
            if data == "ping":
                await websocket.send_json({"type": "pong"})
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("WebSocket disconnected.")
    except Exception as e:
        logger.error(f"WebSocket closed unexpectedly. Error: {e}")
        manager.disconnect(websocket)