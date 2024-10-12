import { React, useEffect, useState } from "react";
import "./SideBar.css"
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { RiHistoryFill } from "react-icons/ri";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom'
import authService from "../../services/authService";

const SideBarExpand = false



const SideBar = () => {

    //["Home","History","Subscriptions","Profile"]

    const [sideBarValues, setSideBarValues] = useState([
        { name: "", icon: () => { return <GoHomeFill size={24} /> } },
        { name: "History", icon: () => { return <RiHistoryFill size={24} /> } },
        { name: "Playlists", icon: () => { return <MdSubscriptions size={24} /> } },
        { name: `Profile/pleaseLogin`, icon: () => { return <FaUser size={24} /> } },
    ])


    useEffect(() => {
        const fetchData = async () => {
            
            let userProfile = await authService.getUserData();
            //console.log("userProfile ", userProfile)
            if (userProfile) {
                setSideBarValues([
                    { name: "", icon: () => { return <GoHomeFill size={24} /> } },
                    { name: "History", icon: () => { return <RiHistoryFill size={24} /> } },
                    { name: "Playlists", icon: () => { return <MdSubscriptions size={24} /> } },
                    { name: `Profile/${userProfile?.data.data.username}`, icon: () => { return <FaUser size={24} /> } },
                ])
            }
        }

        if (authService.checkLoggedIn()) fetchData()
    }, [authService.checkLoggedIn()])



    return (
        <>
            <div className="sideBar" style={SideBarExpand ? { width: '18%' } : { width: '6%' }}>

                <ul>
                    {
                        sideBarValues.map((value) =>
                            <li className="listVlaues"
                                key={value.name}
                            >
                                <NavLink
                                    style={({ isActive }) => ({
                                        color: isActive ? "black" : "gray"
                                    })}
                                    to={"/" + value.name}
                                >
                                    {value.icon()}
                                </NavLink>
                            </li>
                        )
                    }


                </ul>
            </div>
            <div className="sideBarPos" style={SideBarExpand ? { width: '20%' } : { width: '6%' }}></div>
        </>
    );
};

export default SideBar