import React from "react";  
import "./VideoCardGrid.css"
import MyThumbnail from './../../assets/MyThumbnail.png'
import getCroppedImageUrl from "../../services/cropImage";
import { Link } from "react-router-dom";

const views = "1k"
const uploaded = "1 month"

const VideoCardGrid = ({thumbnail,title,channelOwnerName,channelOwnerAvatar,id}) => {
    return (
        <Link to={"/Video/" + ":" + id} className="link-reset">
        <div className="videoCardBack">
            <img src={getCroppedImageUrl(thumbnail)} className="videoThumbnail"></img>
                <div className="MainTitleArea">
                <img src={channelOwnerAvatar} className="videoCardChannelImg"></img>
                    <div className="channelData">
                    <h4 className="VideoTitle">{title}</h4>
                    <p className="channelDataTxt gapTop">{channelOwnerName}</p>
                    <div className="vidContentText">
                        <p className="channelDataTxt">{views + " "}views</p>
                        <p className="channelDataTxt textGap">.</p>
                        <p className="channelDataTxt textGap">{uploaded + " "}ago</p>
                    </div>
                    </div>
                </div>
        </div>
        </Link>
    );
};

export default VideoCardGrid