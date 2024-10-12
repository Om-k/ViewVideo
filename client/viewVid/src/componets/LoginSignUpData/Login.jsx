import "./LoginSignUp.css"
import NavBar from "../NavbarData/NavBar"
import { useState } from "react";
import getData from "../../hooks/getData";
import apiClient from "../../services/apiClient";
import AuthService from "../../services/authService";
import "../../global.css"
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [wrongCred,setWrongCred] = useState(false)
    const [errorOuccered,setErrorOuccered] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        const loggedIn = await AuthService.login(loginData)
        setErrorOuccered(true)

        //Navigation happening inside login as reload needed
        // if(loggedIn){
        //     navigate("/")

        if(!loggedIn){
            setWrongCred(!loggedIn)
        }
    }

    return (
        <>
            <NavBar searchVisible={false} rightVisible={false} />

            <div className="login-area-login">

                <form className="login-form-main">
                    <h2 className="login-text">Login</h2>


                    <div className="inp-text-section">
                        <label htmlFor="email" className="inp-label">Email</label>
                        <input id="email" placeholder="Enter Email" className="inp-feild"
                            onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }} 
                            required/>
                    </div>

                    <div className="inp-text-section">
                        <label htmlFor="password" className="inp-label">Password</label>
                        <input id="password" placeholder="Enter Password" className="inp-feild" type="password"
                            onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }} 
                            required />
                    </div>  

                    {wrongCred && <p className="danger-txt">User doesn't exist</p>}
                    {/* {errorOuccered && <p className="danger-txt">Error while logging in</p>} */}

                    <div className="submit-btn-area">
                        <button type="submit" className="submit-btn" onClick={handleLogin}>Submit</button>
                    </div>
                </form>

            </div>
        </>
    )
}