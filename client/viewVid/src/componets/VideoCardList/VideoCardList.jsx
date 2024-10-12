import React, { useEffect, useState } from "react";
import getCroppedImageUrl from "../../services/cropImage";
import "./VideoCardList.css"
import placeholder from "../../assets/placeholder.webp"
import { Link } from "react-router-dom";

const VideoCardList = ({ thumbnail, title, channelOwnerName, channelOwnerAvatar,id,videoWidth=0 }) => {

    return (
        <Link to={"/Video/:" + id} className="link-reset"> 
            <div className="list-video-card">
                <img src={getCroppedImageUrl(thumbnail)} className="channel-image" 
                style={{width: videoWidth>0 ? `${videoWidth}em` : '23em' }} ></img>
                <div className="video-info-section">
                    <h1 className="video-title">{title}</h1>
                    <div className="channel-owner-area">
                        <img className="owner-image" src={channelOwnerAvatar} alt={placeholder} />
                        <p className="owner-name">{channelOwnerName}</p>
                    </div>
                    <p>1k Views</p>
                </div>
            </div>
        </Link>
    )
}

export default VideoCardList