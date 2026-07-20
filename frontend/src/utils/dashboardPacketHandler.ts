import type { DashboardEventType } from "../types/dashboardEvents";

export function handleDashboardPacket(
    previousData: any,
    packet: any
) {

    if (!packet) {

        return previousData;

    }

    const type = packet.type as DashboardEventType;

    switch (type) {

        case "connection_confirmed":

            return previousData;

        case "full_dashboard": {

            const { type, ...dashboard } = packet;

            return {

                ...previousData,

                ...dashboard

            };

        }

        case "kpi_update":

            return {

                ...previousData,

                metrics: {

                    ...previousData?.metrics,

                    ...packet.data

                }

            };

        case "timeline_update":

            return {

                ...previousData,

                timeline: packet.data

            };

        case "incident_update":

            return {

                ...previousData,

                incident: {

                    ...previousData?.incident,

                    ...packet.data

                }

            };

        case "oracle_update":

            return {

                ...previousData,

                oracle: {

                    ...previousData?.oracle,

                    ...packet.data

                }

            };

        case "brain_update":

            return {

                ...previousData,

                brain: {

                    ...previousData?.brain,

                    ...packet.data

                }

            };

        case "council_update":

            return {

                ...previousData,

                council: {

                    ...previousData?.council,

                    ...packet.data

                }

            };

        case "topology_update":

            return {

                ...previousData,

                topology: packet.data

            };

        case "metrics_update":

            return {

                ...previousData,

                metrics: {

                    ...previousData?.metrics,

                    ...packet.data

                }

            };

        default:

            return {

                ...previousData,

                ...packet

            };

    }

}