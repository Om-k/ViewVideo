import { useParams } from "react-router-dom"
import VideoAreaList from "../VideoAreaList/VideoAreaList"
import "./PlaylistVideos.css"
import getData from "../../hooks/getData"
import LoadingPage from "../LoadingPage/LoadingPage.jsx"
import getCroppedImageUrl from "../../services/cropImage.js"
import noImage from "../../assets/placeholder.webp"

const getCroppedAndBlurred = (url) => {
    if (!url) return noImage;
    const target = 'upload/';
    const index = url.indexOf(target) + target.length;

    return url.slice(0, index) +
        'b_black,c_pad,ar_16:9,w_1280,h_720,e_blur:1000/e_brightness:-50/' + // Adjust brightness as needed
        url.slice(index);
}

export default function () {
    const { playlistId = "" } = useParams()

    const [playlistData, loading, error] = getData(`playlist/${playlistId}`)

    console.log(playlistData)

    return (
        <>
            {loading && <LoadingPage />}
            {playlistData._id &&
                <div>
                    <div className="playlist-container">
                        <div className="channel-info" style={{ backgroundImage: `url(${getCroppedAndBlurred(playlistData.thumbnail)})` }} >
                            <img src={getCroppedImageUrl(playlistData.thumbnail)} className="playlist-thumbnail" ></img>
                            <div className="playlist-text" >
                                <h2>{playlistData.name}</h2>
                                <p>{`${playlistData.videos.length} videos`}</p>
                            </div>
                        </div>

                        <div className="channel-info-area" ></div>
                        <div className="playlist-videos">
                            <VideoAreaList videoWidth={18} pageName="Playlist" />
                        </div>
                    </div>

                </div>}
        </>
    )
}