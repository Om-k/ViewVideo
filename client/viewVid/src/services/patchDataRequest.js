import apiClient from "./apiClient";

const patchDataRequest = async (path, data) => {
    try {
        const response = await apiClient.patch(path, data);
        return response;
    } catch (error) {
        console.error("Error making patch request:", error);
        throw error;
    }
};

export default patchDataRequest