import React, { useEffect, useState } from "react";
import "./NavBar.css"
import logo from "../../assets/Logo3.png"
import logo_white from "../../assets/LogoWhite.png"
import logo_white_2 from "../../assets/LogoWhiteSvg.svg"
import placeholder from "../../assets/placeholder.webp"
import { MdOutlineVideoCall } from "react-icons/md";
import { MdVideoCall } from "react-icons/md";
import getData from "../../hooks/getData";
import apiClient from "../../services/apiClient"
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import authService from "../../services/authService";

const NavBar = ({ searchVisible = true, rightVisible = true }) => {
    const beforeLoginWindowVals = [{ name: "Log In", path: "/Login" }, { name: "Sign Up", path: "/SignUp" }]
    const afterLoginWindowVals = [{ name: "Settings", path: "/Settings" }, { name: "Log Out", path: "/LogOut" }]

    const navigate = useNavigate();

    const [searchVal, setSearchVal] = useState("");
    const [openWindow, setOpenWindow] = useState(false)
    const [userData, loading, error] = authService.checkLoggedIn() ? getData('users/current-user') : useState({})


    const clearSearch = () => {
        setSearchVal("")
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        //const [videos, loading, error] = getData('/videos/?query=' + searchVal)
        // const response = await apiClient.get('/videos/?query=' + searchVal);
        // //setResult(response.data.data)
        // console.log(response.data.data.videos);

        if (searchVal) {
            navigate(`/SearchVideo/` + searchVal);
        }
    }

    const handleWindowSelect = (selectedPath) => {
        navigate(selectedPath);
    }

    return (
        <>
            <div className="NavBar">
                <div className="logo-area">
                    <Link to={"/"} className="link-reset">
                        <img src={logo_white_2} alt="View Video" className="logo" />
                    </Link>
                </div>

                {searchVisible &&
                    <div className="search-area">
                        <form className="inp-form" onSubmit={handleSearchSubmit}>
                            <div className="search-inp">
                                <input placeholder="Search" className="search-inp-type-area" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
                                <div className="cross-area">
                                    {searchVal && <IoCloseSharp size={20} className="cross" onClick={clearSearch} />}
                                </div>
                            </div>
                        </form>
                    </div>
                }

                {rightVisible &&
                    <>
                        <div className="user-profile-area">
                            <Link to="/UploadVideo">
                                <MdVideoCall size={35} color="black" className="upload-video" />
                            </Link>
                            <img src={userData.avatar ? userData.avatar : placeholder} alt="Profile" className="user-profile" onClick={() => { setOpenWindow(!openWindow) }} />
                        </div>

                        {openWindow &&
                            <div className="drop-down-window">
                                <div className="drop-down-container">
                                    {authService.checkLoggedIn() == true ?
                                        afterLoginWindowVals.map((val, index) =>
                                            <p className="drop-down-element" key={index} onClick={() => {
                                                if (val.name == "Log Out") { authService.logout() }
                                                else { handleWindowSelect(val.path) }
                                            }}>{val.name}</p>
                                        )
                                        :
                                        beforeLoginWindowVals.map((val, index) =>
                                            <p className="drop-down-element" key={index} onClick={() => { handleWindowSelect(val.path) }}>{val.name}</p>
                                        )
                                    }
                                </div>
                            </div>}
                    </>
                }

            </div>
            <div className="NavBarPos"></div>
        </>
    );
};

export default NavBar