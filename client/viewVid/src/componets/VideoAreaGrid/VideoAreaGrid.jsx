import React, { useState } from "react";
import "./VideoAreaGrid.css";
import VideoCardGrid from "../VideoCardGrid/VideoCardGrid";
import getData from "../../hooks/getData";
import { useEffect } from "react";
import placeholder from "../../assets/placeholder.webp";
import getPaginatedVideos from "../../hooks/getPaginatedVideos";

//const videos = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
const SideBarExpand = false
const isPc = true

const VideoAreaGrid = ({ userId = "" }) => {
    // console.log(userId)
    //const [videos, setVideos] = useState([])
    //const [result, loading, error] = getData('videos' + (userId ? ("?userId=" + userId) : ""))
    const [videos, loading, error] = getPaginatedVideos('/videos',"",userId)
    //console.log("videos ",videos)

    //useEffect(()=>{
    //    setVideos(result.videos)
    //},[result])

    return (
        <div>
            {
                (videos) && videos.length > 0 &&
                <div className="grid-container" style={SideBarExpand && isPc ? { display: 'grid', gridTemplateColumns: '33.33% 33.33% 33.33%' } : {}}>
                    {videos.map((video, index) => (
                        <div className="grid-item" key={index}>
                            <VideoCardGrid thumbnail={video.thumbnail} title={video.title}
                                channelOwnerName={video?.owner?.username || "Unknown"} channelOwnerAvatar={video?.owner?.avatar || placeholder} id={video?._id} />
                        </div>
                    ))}
                </div>
            }
            {
                error && <h1>Error</h1>
            }
            {
                loading && <h1>Loading</h1>
            }
        </div>
    );
};

export default VideoAreaGrid;
