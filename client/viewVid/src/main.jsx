// import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './global.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VideoAreaGrid from './componets/VideoAreaGrid/VideoAreaGrid.jsx'
import FrontPage from './componets/FrontPageData/FrontPage.jsx'
import VideoAreaList from './componets/VideoAreaList/VideoAreaList.jsx'
import PlaylistListView from './componets/PlaylistListView/PlaylistListView.jsx'
import UserProfile from './componets/UserProfile/UserProfile.jsx'
import VideoPage from './componets/VideoPage/VideoPage.jsx'
import Login from './componets/LoginSignUpData/Login.jsx'
import SignUp from './componets/LoginSignUpData/SignUp.jsx'
import VideoUpload from './componets/VideoUpload/VideoUpload.jsx'
import Settings from './componets/SettingsData/Settings.jsx'
import VideoUploadingPage from './componets/VideoUploadingPage/VideoUploadingPage.jsx'
import PleaseLogin from './componets/PleaseLogin/PleaseLogin.jsx'
import authService from './services/authService.js'
import VideoAreaListHistory from './componets/VideoAreaListHistory/VideoAreaListHistory.jsx'
import PlaylistVideos from './componets/PlaylistVideos/PlaylistVideos.jsx'

//console.log("checkLoggedIn",authService.checkLoggedIn())

const router = createBrowserRouter([
    {
        path: '/',
        element: <FrontPage />,
        children: [
            {
                path: "",
                element: <VideoAreaGrid />,
            },
            {
                path: "History",
                element: authService.checkLoggedIn() ? <VideoAreaList pageName={"History"} /> : <PleaseLogin/> ,
            },
            {
                path: "Playlists",
                element: authService.checkLoggedIn() ? <PlaylistListView /> : <PleaseLogin/>,
            },
            {
                path: "Profile/:userName",
                element: authService.checkLoggedIn() ? <UserProfile /> : <PleaseLogin/>,
            },
            {
                path: '/SearchVideo/:query',
                element: <VideoAreaList pageName={"Search"} />
            },
            {
                path: "/Playlist/:playlistId",
                element: authService.checkLoggedIn() ? <PlaylistVideos/> : <PleaseLogin/> ,
            }
        ]
    },
    {
        path: '/Video/:videoId',
        element: <VideoPage />
    },
    {
        path: '/Login',
        element: <Login />
    },
    {
        path: '/SignUp',
        element: <SignUp />
    },
    {
        path: '/UploadVideo',
        element: <VideoUpload />
    },
    {
        path: '/Settings',
        element: <Settings />
    },
    {
        path: '/VideoUploading',
        element: <VideoUploadingPage />
    },
])




createRoot(document.getElementById('root')).render(
    // <App />
        <RouterProvider router={router}/>
)
