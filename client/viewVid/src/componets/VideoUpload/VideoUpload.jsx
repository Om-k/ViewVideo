import "./VideoUpload.css"
import NavBar from "../NavbarData/NavBar"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function () {

    const navigate = useNavigate();

    const [videoUploaded, setVideoUploaded] = useState(false)
    const [thumbnailUploaded, setThumbnailUploaded] = useState(false)
    const [videoData, setVideoData] = useState(
        {
            title: "",
            description: "",
            videoFile: null,
            thumbnail: null
        })

    const [status, setStatus] = useState('published');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Data", videoData)

        const formData = new FormData();
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        formData.append('videoFile', videoData.videoFile);
        formData.append('thumbnail', videoData.thumbnail);

        try {
            await apiClient.post("/videos", formData);
            console.log("Video Uploaded")
        } catch (err) {
            console.log(err)
        }

        //navigate('/VideoUploading', { state: { videoData: videoData } });
    };

    return (
        <>
            <NavBar searchVisible={false} rightVisible={false} />

            <div className="login-area">

                <form className="login-form">
                    <h2 className="login-text">Video Details</h2>
                    <div className="login-area-cont">
                        <div className="text-section">
                            <div className="inp-text-section">
                                <label className="inp-label">Tiltle</label>
                                <input placeholder="Enter Title"
                                    onChange={(e) => { setVideoData({ ...videoData, title: e.target.value }) }}
                                    className="inp-feild" required />
                            </div>

                            <div className="inp-text-section">
                                <label className="inp-label">Description</label>
                                <textarea placeholder="Enter Description" className="inp-feild description-text-area"
                                    onChange={(e) => { setVideoData({ ...videoData, description: e.target.value }) }} />
                            </div>

                            <div className="inp-text-section inp-radio">
                                <label className="publish-label">
                                    <input
                                        type="radio"
                                        name="publish-status"
                                        value="published"
                                        checked={status === 'published'}
                                        onChange={handleStatusChange}
                                    />
                                    <p className="inp-pulish">Published</p>
                                </label>

                                <label className="publish-label">
                                    <input
                                        type="radio"
                                        name="publish-status"
                                        value="unpublished"
                                        checked={status === 'unpublished'}
                                        onChange={handleStatusChange}
                                    />
                                    <p className="inp-pulish">UnPublished</p>
                                </label>
                            </div>
                        </div>

                        <div className="image-inp-section">
                            <div className="inp-text-section">
                                <label htmlFor="file-upload-dp" className="inp-label">Video</label>
                                <div className="custom-file-upload">
                                    <label htmlFor="file-upload-dp" className="custom-file-label">
                                        {!videoUploaded ? "Upload" : "Change"}
                                    </label>
                                    <input id="file-upload-dp" type="file" className="inp-field" accept="video/*"
                                        onChange={(e) => {
                                            setVideoUploaded(true);
                                            setVideoData({ ...videoData, videoFile: e.target.files[0] })
                                        }} />
                                </div>
                            </div>

                            <div className="inp-text-section">
                                <label htmlFor="file-upload-Cover" className="inp-label">Thumbnail</label>
                                <div className="custom-file-upload">
                                    <label htmlFor="file-upload-Cover" className="custom-file-label" >
                                        {!thumbnailUploaded ? "Upload" : "Change"}
                                    </label>
                                    <input id="file-upload-Cover" type="file" className="inp-field" accept="image/*"
                                        onChange={(e) => {
                                            setThumbnailUploaded(true);
                                            setVideoData({ ...videoData, thumbnail: e.target.files[0] })
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="upload-btn-area">
                        <button type="submit" onClick={handleSubmit} >Upload</button>
                    </div>


                </form>

            </div>

        </>
    )
}