import React, { useEffect, useState } from "react";
import getData from "../../hooks/getData";
import VideoCardList from "../VideoCardList/VideoCardList";
import placeholder from "../../assets/placeholder.webp";
import "./VideoAreaList.css"
import { useParams } from "react-router-dom";
import getPaginatedVideos from "../../hooks/getPaginatedVideos";
import Spinner from "../SpinnerData/Spinner";

const VideoAreaList = ({ videoWidth = 0, pageName="" }) => {

    const { query = "",playlistId="" } = useParams()
    const videosParams = pageName == "History" ? ['users/history'] : pageName == "Playlist" ?  [`playlist/${playlistId}`] : ['/videos', query] ;
    const [videos, loading, error] = getPaginatedVideos(...videosParams);


    // useEffect(() => {
    //     console.log("gg", videos)
    // }, [videos])


    return (
        <div>
            {videos && (
                <>
                    {videos.length > 0 ? (
                        <ul>
                            {videos.map((video, index) => (
                                <li className="list-item-video" key={index}>
                                    <VideoCardList
                                        thumbnail={video.thumbnail}
                                        title={video.title}
                                        channelOwnerName={video?.owner?.username || "Unknown"}
                                        channelOwnerAvatar={video?.owner?.avatar || placeholder}
                                        id={video?._id}
                                        videoWidth={videoWidth}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !loading && <h1>No Videos Found!</h1>
                    )}
                </>
            )}
            {loading &&
                <Spinner/>
                }
        </div>
    )
}

export default VideoAreaList