import { useEffect, useState } from "react"
import "./AddPlaylistSection.css"
import getData from "../../hooks/getData"
import authService from "../../services/authService"
import { IoMdClose } from "react-icons/io";
import postRequest from "../../services/postDataRequest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import patchDataRequest from "../../services/patchDataRequest";
import postDataRequest from "../../services/postDataRequest.js";

export const AddPlaylistSection = ({ setAddingPlaylist }) => {

    const { videoId } = useParams()

    const [userId, setUserID] = useState("")
    const [playlists, loading, error, setRender] = getData(`playlist/user/${userId}`)

    useEffect(() => {
        ; (async () => {
            const userData = await authService.getUserData();
            setUserID(userData.data.data._id);
            setRender(prevVal => !prevVal)
            //setUserID(userData._Id)
        })()

    }, [])

    const closeAddingPlaylist = () => {
        setAddingPlaylist(false)
    }

    const handlePlaylistSelect = async (e) => {
        if (e.target.checked) {
            console.log(e.target.id)
            await patchDataRequest(`playlist/add/${videoId.slice(1)}/${e.target.id}`)
            toast("Video added to " + e.target.value);
        } else {
            console.log(e.target.id)
            await patchDataRequest(`playlist/remove/${videoId.slice(1)}/${e.target.id}`)
            toast("Video removed from " + e.target.value);
        }

        setRender(prev => !prev)
    }

    const [creatingPlaylist, setCreatingPlaylist] = useState(false)

    //const [name, setName] = useState("");
    //const [description, setDescription] = useState("");
    const [playlistData,setPlaylistData] = useState({name:'',description:''})
    const [creatingPlaylistLoad, setCreatingPlaylistLoad] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!playlistData.name) {
            toast("Please enter a playlist name");
            return;
        }
        setCreatingPlaylist(true);

        await postDataRequest('playlist',playlistData)

        setPlaylistData({name:'',description:''})
        toast("Playlist created")
        setCreatingPlaylistLoad(false)
        setCreatingPlaylist(false);
        setRender(prev => !prev)
    }

    return (
        <div className="add-playlist-area">

            <ToastContainer />

            <div className="playlist-values">
                <div className="playlist-header-area">
                    <h2>Save Video to</h2>
                    <IoMdClose size={25} className="close-btn" onClick={closeAddingPlaylist} />
                </div>
                {!creatingPlaylist &&
                    <div className="playlists-area" >
                        <div className="playlists" >
                            {playlists.map((playlist, index) => <div key={playlist._id + index + "Val"} className="playlist" >
                                <input checked={playlist.videos.includes(videoId.slice(1))} onChange={handlePlaylistSelect} className="playlist-box" type="checkbox" id={playlist._id} value={playlist.name} key={playlist._id + index + "Inp"} ></input>
                                <label className="playlist-name" htmlFor="vehicle1" key={playlist._id + index + "Lab"}> {playlist.name}</label>
                                <br key={playlist._id + index + "br"} ></br>
                            </div>)}
                        </div>

                        <div className="playlist-button-area">
                            <button className="playlist-button" onClick={() => { setCreatingPlaylist(true) }} >New Playlist</button>
                        </div>
                    </div>
                }

                {creatingPlaylist &&
                    <div className="playlists-area" >
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder="Name"
                                required
                                value={playlistData.name}
                                onChange={(e) => setPlaylistData({...playlistData,name:e.target.value})}
                                className="inp-feild"
                            />
                            <textarea
                                placeholder="Description"
                                value={playlistData.description}
                                onChange={(e) => setPlaylistData({...playlistData,description:e.target.value})}
                                className="inp-feild description-text-area"
                            />
                            <div className="playlist-button-area">
                                <button className="playlist-button" type="submit" >
                                    {creatingPlaylistLoad ? "Creating..." : "Create"}
                                </button>
                                
                                <button className="playlist-button sec-playlist-button" onClick={()=>{setCreatingPlaylist(false)}} >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}