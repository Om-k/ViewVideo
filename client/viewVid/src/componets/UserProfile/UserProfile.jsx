import React, { useState } from "react";
import placeholder from "../../assets/placeholder.webp"
import "./UserProfile.css"
import VideoAreaGrid from "../VideoAreaGrid/VideoAreaGrid";
import getData from "../../hooks/getData";
import { useParams } from "react-router-dom";

const UserProfile = () => {

    const { userName } = useParams()
    //console.log(userName)

    const [userProfile, loading, error] = getData('/users/c/' + userName)
    
    //console.log(userProfile);


    if (error) {
        return (
            <h1>Error</h1>
        );
    }
    else if (loading) {
        return (
            <h1>Loading</h1>
        );
    }
    else if (userProfile) {
        return (
            <div className="profile-area">
                <img className="channel-cover-img" src={userProfile.coverImage ? userProfile.coverImage : placeholder} alt="Channel Cover" />

                <div className="user-profile-area">
                    <img className="user-profile-img" src={userProfile.avatar ? userProfile.avatar : placeholder} alt="User Profile" />
                    <div className="user-content">
                        <h2>{userProfile.fullName ? userProfile.fullName : "Username"}</h2>
                        <p className="subscribers-text">{userProfile.subcribersCount != undefined ? userProfile.subcribersCount : "10"} subscribers</p>
                    </div>
                </div>

                <h3 style={{ marginTop: '20px' }}>Your Videos</h3>
                <VideoAreaGrid userId={userProfile._id} />
            </div>
        );
    }

}

export default UserProfile