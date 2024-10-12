import { Link, useParams } from "react-router-dom";
import NavBar from "../NavbarData/NavBar";
import getData from "../../hooks/getData";
import postData from "../../hooks/postData";
import { useEffect, useState } from "react";
import "./VideoPage.css"
import VideoAreaList from '../VideoAreaList/VideoAreaList.jsx'
import placeholder from "../../assets/placeholder.webp";
import apiClient from "../../services/apiClient.js";
import authService from "../../services/authService.js";
import CommentsArea from "./CommentsArea.jsx";

import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import postRequest from "../../services/postDataRequest.js";
import { AddPlaylistSection } from "../AddPlaylistSection/AddPlaylistSection.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function () {
    const getDate = (dateWithTime) => {
        const date = new Date(dateWithTime)
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        const extractedDate = `${day}-${month}-${year}`;
        return extractedDate
    }


    const handleLike = async () => {
        await postRequest(`/likes/toggle/v/${videoId.slice(1)}`)
        setLikeRender(prevVal => !prevVal)
    }

    const [addingPlaylist, setAddingPlaylist] = useState(false)

    const { videoId } = useParams()
    const [videos, loading, error] = authService.checkLoggedIn() ? getData('/videos/' + videoId.slice(1)) : getData('/videos/notLoggedIn/' + videoId.slice(1))


    const [isLiked, loadingLike, errorLike, setLikeRender] = authService.checkLoggedIn() ? getData(`/likes/checkLike/${videoId.slice(1)}`) : [false, false, false]

    const [subscribed, setSubscribed] = useState(false)
    const [isChannelOwenr, setIsChannelOwenr] = useState(false)

    useEffect(() => {
        if (videos._id) {
            setSubscribed(videos.subscriptionData.subscribed)
            setIsChannelOwenr(videos.subscriptionData.disabled)
        }
    }, [videos])

    const handleSubscribe = async () => {
        const resp = await postRequest(`subscriptions/c/${videos.owner._id}`)
        setSubscribed(resp.data.message.split(" ")[2] == "subscribed")
    }

    const setShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
        toast("Link Copied");
    }

    if (error) return (
        <h1>Error</h1>
    )
    else if (loading) return (
        <h1>Loading</h1>
    )
    else return (
        <>
            <ToastContainer />

            {addingPlaylist && <AddPlaylistSection setAddingPlaylist={setAddingPlaylist} />}
            <NavBar />
            <div className="video-content-container">
                <div className="video-all-content">
                    <video controls className="video-diplay-box">
                        <source src={videos.videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h1>{videos.title}</h1>
                    <div className="channel-owner-info">
                        <div className="video-content-left">
                            <Link to={`/Profile/${videos?.owner?.username}`} className="link-reset" >
                                <img src={videos?.owner?.avatar || placeholder} className="channel-owner-avatar" ></img>
                                <div className="name-subsribers">
                                    <p className="channel-name">{videos?.owner?.username || "Username"}</p>
                                    <p className="subscriber-count">10k subscribers</p>
                                </div>
                            </Link> 

                            <button className={`subscribe-button ${isChannelOwenr && 'disabled'}`} onClick={handleSubscribe}>
                                {subscribed ? "Unsubscribe" : "Subscribe"}
                            </button>
                        </div>
                        <div className="video-content-right">
                            <div className="content-bg">
                                {typeof isLiked === "boolean" && isLiked ? <AiFillLike size={24} onClick={() => { handleLike() }} /> : <AiOutlineLike size={24} onClick={() => { handleLike() }} />}
                            </div>
                            <div className="content-bg" onClick={setShare}>
                                Share
                            </div>
                            <div className="content-bg" onClick={() => { setAddingPlaylist(true) }} >
                                Playlist
                            </div>
                        </div>
                    </div>
                    <div className="video-description">
                        <div className="views-date">
                            <p className="video-views">{videos.views} views</p>
                            <p className="video-views video-date">{"Uploaded on"} {getDate(videos.createdAt)}</p>
                        </div>
                        <p className="video-description-text">{videos.description}</p>
                    </div>

                    <CommentsArea videoId={videoId} />

                </div>
                <VideoAreaList />
            </div>
        </>
    )
}