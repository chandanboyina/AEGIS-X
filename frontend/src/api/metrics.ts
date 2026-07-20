import api from "./api";

export const MetricsAPI = {
    get: async () => {
        const { data } = await api.get("/metrics");
        return data;
    }
};