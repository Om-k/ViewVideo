import React, { useEffect, useState } from "react";
import "./PlaylistListView.css"
import placeholder from "../../assets/placeholder.webp"
import getCroppedImageUrl from "../../services/cropImage";
import getData from "../../hooks/getData";
import authService from "../../services/authService";
import LoadingPage from "../LoadingPage/LoadingPage.jsx"
import { Link } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

const PlaylistListView = () => {

    const [userId, setUserID] = useState("")
    const [playlists, loading, error, setRender] = getData(`playlist/user/${userId}`)
    //console.log(playlists)

    useEffect(() => {
        ; (async () => {
            const userData = await authService.getUserData();
            //console.log(userData.data.data._id);

            setUserID(userData.data.data._id);
            setRender(prevVal => !prevVal)
            //setUserID(userData._Id)
        })()

    }, [])

    return (
        <>
            {error && <ErrorPage />}

            {loading && <LoadingPage />}

            {!loading && (<> {
                playlists.length > 0 ?
                    <div>
                        {
                            playlists.map((playlist, index) =>
                                <Link to={`/Playlist/${playlist._id}`} className="playlist-card link-reset" key={index + playlist._id}>
                                    <img src={playlist.thumbnail ? playlist.thumbnail : placeholder} className="playlist-image" />
                                    <div className="playlist-details">
                                        <h2 className="playlist-title">{playlist.name}</h2>
                                        <p>Public</p>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                    :
                    <h1>No Playlists!</h1>}
            </>)}
        </>
    )
}

export default PlaylistListView