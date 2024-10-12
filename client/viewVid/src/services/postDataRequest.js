import apiClient from "./apiClient";

const postRequest = async (path, data) => {
    try {
        const response = await apiClient.post(path, data);
        return response;
    } catch (error) {
        console.error("Error making POST request:", error);
        throw error;
    }
};

export default postRequest