import axios from "axios";

// Fallback to 127.0.0.1:8000 if VITE_API_URL is not defined in your .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
console.log("API Base URL:", API_BASE_URL);

const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        // Detailed logging to help you see exactly which URL is failing
        console.error("API Error - Config:", error.config?.url);
        console.error("API Error - Message:", error.message);
        return Promise.reject(error);
    }
);

export default client;