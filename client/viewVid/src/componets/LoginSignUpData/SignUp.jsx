import "./LoginSignUp.css"
import NavBar from "../NavbarData/NavBar"
import { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadingPage from "../UploadingPage/UploadingPage";

export default function () {
    const navigate = useNavigate()

    const [uploading,setUploading] = useState(false)

    const [userData, setUserData] = useState(
        {
            fullName: "",
            email: "",
            password: "",
            username: "",
            avatar: null,
            coverImage: null
        })

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Data", userData)

        const formData = new FormData();
        formData.append('fullName', userData.fullName);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('username', userData.fullName);
        formData.append('avatar', userData.avatar);
        formData.append('coverImage', userData.coverImage);


        setUploading(true)
        const logInResp = await authService.signUp(formData)
        //console.log(logInResp)
        setUploading(false)
        //toast("User Created Please logIn");
        navigate("/Login/true")

    }

    return (
        <>
            <ToastContainer />
            {uploading && <UploadingPage/> }
            <NavBar searchVisible={false} rightVisible={false} />

            <div className="login-area">

                <form className="login-form">
                    <h2 className="login-text">SignUp</h2>
                    <div className="login-area-cont">
                        <div className="text-section">
                            <div className="inp-text-section">
                                <label className="inp-label">Username</label>
                                <input placeholder="Enter Username" className="inp-feild"
                                    onChange={(e) => { setUserData({ ...userData, fullName: e.target.value }) }}
                                    required
                                    minLength={3}
                                />
                            </div>

                            <div className="inp-text-section">
                                <label className="inp-label">Email</label>
                                <input placeholder="Enter Email" className="inp-feild"
                                    onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
                                    required />
                            </div>

                            <div className="inp-text-section">
                                <label htmlFor="password" className="inp-label">Password</label>
                                <input id="password" placeholder="Enter Password" className="inp-feild"
                                    onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
                                    required />
                            </div>
                        </div>

                        <div className="image-inp-section">
                            <div className="inp-text-section">
                                <label htmlFor="file-upload-dp" className="inp-label">Profile Picture</label>
                                <div className="custom-file-upload">
                                    <label htmlFor="file-upload-dp" className="custom-file-label">
                                        Upload
                                    </label>
                                    <input id="file-upload-dp" type="file" className="inp-field" accept="image/*"
                                        onChange={(e) => { setUserData({ ...userData, avatar: e.target.files[0] }) }}
                                        required />
                                </div>
                            </div>

                            <div className="inp-text-section">
                                <label htmlFor="file-upload-Cover" className="inp-label">Cover Picture</label>
                                <div className="custom-file-upload">
                                    <label htmlFor="file-upload-Cover" className="custom-file-label" >
                                        Upload
                                    </label>
                                    <input id="file-upload-Cover" type="file" className="inp-field" accept="image/*"
                                        onChange={(e) => { setUserData({ ...userData, coverImage: e.target.files[0] }) }}
                                        required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="upload-btn-area">
                        <button type="submit" onClick={handleSubmit} >Upload</button>
                    </div>

                </form>

            </div>

        </>
    )
}