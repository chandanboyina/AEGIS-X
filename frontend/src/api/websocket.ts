const WS_BASE_URL =
    import.meta.env.VITE_WS_URL ||
    "ws://127.0.0.1:8000/ws/dashboard";

console.log("WS URL:", WS_BASE_URL);

export const connectToDashboardSocket = (
    onMessage: (data: any) => void,
    onError?: (error: Event) => void
): WebSocket => {

    const socket = new WebSocket(WS_BASE_URL);

    socket.onopen = () => {
        console.log("Dashboard WebSocket Connected");
    };

    socket.onmessage = (event) => {
        try {

            const data = JSON.parse(event.data);

            onMessage(data);

        } catch (err) {

            console.error("WebSocket parse error", err);

        }
    };

    socket.onerror = (error) => {

        console.error("WebSocket Error", error);

        onError?.(error);

    };

    socket.onclose = (event) => {

        console.log(
            "Dashboard WebSocket Closed",
            event.code,
            event.reason
        );

    };

    return socket;
};