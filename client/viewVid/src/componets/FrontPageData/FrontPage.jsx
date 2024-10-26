import "./FrontPage.css"
import NavBar from "../NavbarData/NavBar";
import SideBar from "../SideBarData/SideBar"
import {  Outlet } from 'react-router-dom'
import initialization from "../../services/initialization";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useEffect } from "react";

const FrontPage = () => {

    return (
        <div>
            <NavBar />
            <div className="videoAndSideBarCont">
                <SideBar />
                <div className="VideosAreaCont" style={{ width: '100%' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default FrontPage