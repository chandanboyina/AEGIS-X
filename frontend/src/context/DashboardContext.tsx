import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import type { ReactNode } from "react";

import { DashboardAPI } from "../api/dashboard";
import { connectToDashboardSocket } from "../api/websocket";
import { handleDashboardPacket } from "../utils/dashboardPacketHandler";

interface DashboardContextType {
    securityData: any;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {

    const [securityData, setSecurityData] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const socketRef = useRef<WebSocket | null>(null);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const data = await DashboardAPI.latest();

            setSecurityData(() => data);

            setError(null);

        } catch {

            setError("Unable to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const initialize = async () => {

            await loadDashboard();

            if (!socketRef.current) {

                socketRef.current = connectToDashboardSocket((packet) => {

                    console.log("📡 Dashboard Stream", packet);

                    if (packet.type === "connection_confirmed") {

                        return;

                    }

                    setSecurityData((previousData: any) =>
                        handleDashboardPacket(previousData, packet)
                    );

                });

            }

        };

        initialize();

        return () => {

            socketRef.current?.close();

            socketRef.current = null;

        };

    }, []);

    return (

        <DashboardContext.Provider
            value={{
                securityData,
                loading,
                error,
                refresh: loadDashboard
            }}
        >

            {children}

        </DashboardContext.Provider>

    );

}

export function useDashboard() {

    const context = useContext(DashboardContext);

    if (!context) {

        throw new Error("useDashboard must be used inside DashboardProvider");

    }

    return context;

}