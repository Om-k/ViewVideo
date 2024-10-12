import React, { useEffect, useState } from "react";
import getData from "../../hooks/getData";
import VideoCardList from "../VideoCardList/VideoCardList";
import placeholder from "../../assets/placeholder.webp";
import "./VideoAreaList.css";
import { useParams } from "react-router-dom";
import getPaginatedVideos from "../../hooks/getPaginatedVideos";

const VideoAreaListHistory = ({ videoWidth = 0 }) => {

    const [videos,loading,error] = getPaginatedVideos("users/history");


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
                <div className="loader-area">
                    <span className="loader"></span>
                </div>}
            {error && <h1>Error</h1>}
        </div>
    );
};

export default VideoAreaListHistory;
