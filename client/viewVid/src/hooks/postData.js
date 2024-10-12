import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const postData = async (urlPath, requestBody) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await apiClient.post(urlPath, requestBody);
        // return response.data
        setResult(response.data); 
        setLoading(false);
      } catch (error) {
        // return error
        setLoading(false);
        setError(true);
      }
    })();
  }, [urlPath, requestBody]);
  
  return [result, loading, error];
};

export default postData;
