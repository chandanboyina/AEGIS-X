const WS_BASE_URL = import.meta.env.VITE_WS_URL || "ws://127.0.0.1:8000/ws/dashboard";

export const connectToDashboardSocket = (
    onMessage: (data: any) => void,
    onError?: (error: Event) => void
): WebSocket => {
    const socket = new WebSocket(WS_BASE_URL);

    socket.onmessage = (event) => {
        try {
            const parsedData = JSON.parse(event.data);
            onMessage(parsedData);
        } catch (err) {
            console.error("Failed parsing live telemetry frame:", err);
        }
    };

    socket.onerror = (error) => {
        if (onError) onError(error);
    };

    socket.onclose = () => {
    // We use a console log instead to avoid linting warnings
    console.log("AEGIS-X threat telemetry stream offline. Reconnecting...");
    
    // Add a check to prevent infinite loops if the app is unmounting
    if (socket.readyState !== WebSocket.CLOSED) {
        setTimeout(() => {
            connectToDashboardSocket(onMessage, onError);
        }, 3000);
    }
    };

    return socket;
};