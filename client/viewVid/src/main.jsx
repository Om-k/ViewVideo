import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './global.css'
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
import PleaseLogin from './componets/PleaseLogin/PleaseLogin.jsx'
import authService from './services/authService.js'
import VideoAreaListHistory from './componets/VideoAreaListHistory/VideoAreaListHistory.jsx'
import PlaylistVideos from './componets/PlaylistVideos/PlaylistVideos.jsx'
import LoadingPage from './componets/LoadingPage/LoadingPage.jsx'
import initialization from './services/initialization.js'

const AppRouter = () => {

    initialization();
    const loading = false;

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = authService.checkLoggedIn();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, [loading]);

  if (loading) {
    return <LoadingPage/>;
  }

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
          element: isLoggedIn ? <VideoAreaList pageName={"History"} /> : <PleaseLogin />,
        },
        {
          path: "Playlists",
          element: isLoggedIn ? <PlaylistListView /> : <PleaseLogin />,
        },
        {
          path: "Profile/:userName",
          element: isLoggedIn ? <UserProfile /> : <PleaseLogin />,
        },
        {
          path: "/SearchVideo/:query",
          element: <VideoAreaList pageName={"Search"} />,
        },
        {
          path: "/Playlist/:playlistId",
          element: isLoggedIn ? <PlaylistVideos /> : <PleaseLogin />,
        }
      ]
    },
    {
      path: '/Video/:videoId',
      element: <VideoPage />
    },
    {
      path: '/Login/:fromSignUp?',
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
      path: '/Loading',
      element: <LoadingPage />
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <AppRouter />
);
