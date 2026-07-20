import api from "./api";

export const TopologyAPI = {

    get: async () => {

        const { data } = await api.get("/topology");

        return data;

    }

};