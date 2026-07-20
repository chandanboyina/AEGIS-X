import api from "./api";

export const TimelineAPI = {
    get: async () => {
        const { data } = await api.get("/timeline");
        return data;
    }
};