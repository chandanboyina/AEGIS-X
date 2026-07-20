import api from "./api";

export const DashboardAPI = {

    latest: async () => {
        const { data } = await api.get("/dashboard");
        return data;
    },

    summary: async () => {
        const { data } = await api.get("/dashboard/summary");
        return data;
    },

    council: async () => {
        const { data } = await api.get("/dashboard/council");
        return data;
    },

    brain: async () => {
        const { data } = await api.get("/dashboard/brain");
        return data;
    },

    dna: async () => {
        const { data } = await api.get("/dashboard/dna");
        return data;
    },

    twin: async () => {
        const { data } = await api.get("/dashboard/twin");
        return data;
    },

    pipeline: async () => {
        const { data } = await api.get("/dashboard/pipeline");
        return data;
    },

    trace: async () => {
        const { data } = await api.get("/dashboard/trace");
        return data;
    }

};