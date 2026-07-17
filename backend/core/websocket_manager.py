from fastapi import WebSocket


class WebSocketManager:
    """
    Enterprise WebSocket Manager.
    """

    def __init__(self):

        self.connections = []

    async def connect(
        self,
        websocket: WebSocket
    ):

        await websocket.accept()

        self.connections.append(
            websocket
        )

    def disconnect(
        self,
        websocket: WebSocket
    ):

        if websocket in self.connections:

            self.connections.remove(
                websocket
            )

    async def broadcast(
        self,
        data
    ):

        disconnected = []

        for websocket in list(self.connections):

            try:

                await websocket.send_json(
                    data
                )

            except Exception:

                disconnected.append(
                    websocket
                )

        for websocket in disconnected:

            self.disconnect(
                websocket
            )

    async def heartbeat(self):

        await self.broadcast({

            "type": "heartbeat"

        })

    def connection_count(self):

        return len(
            self.connections
        )

    def status(self):

        return {
            "connected_clients":
                len(self.connections)
        }
    
    def statistics(self):

        return {

            "connected_clients":

                len(self.connections),

            "status":

                "Running"

                if self.connections

                else

                "Idle"

        }
    

manager = WebSocketManager()