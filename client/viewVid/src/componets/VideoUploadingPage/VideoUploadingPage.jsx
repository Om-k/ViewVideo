import { useLocation } from "react-router-dom";
import postData from "../../hooks/postData"

export default function () {

    const location = useLocation();
    const { videoData } = location.state || {}; 
    console.log("In",videoData)
    const [result, error, loading] = postData("/videos",videoData)

    if (loading) {
        return <h1>Uploading</h1>
    }
    if (error) {
        return <h1>Error</h1>
    }
    if (result) {
        return <h1>Uploaded</h1>
    }
}