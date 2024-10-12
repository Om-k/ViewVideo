import { useEffect, useRef, useState } from "react";
import apiClient from "../services/apiClient";

const getPaginatedVideos = (urlPath, query = "", userId = "", bottomGapToCallNextPage = 500, pageLimit = 10) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1)
    const [atBottom, setAtBottom] = useState(false);

    const isFirstRender = useRef(true);

    const resetStates = () => {
        setError(false)
        setLoading(true)
        setVideos([])
        setPage(1)
        setAtBottom(false)
    }


    //Function to get videos
    const getVideos = async () => {
        //console.log("Service ",page)
        try {
            const videos = await apiClient.get(`${urlPath}/?page=${page}&query=${query}&userId=${userId}`)
            setAtBottom(false)
            //console.log("Videos: ",videos.data.data)
            if (videos) {
                const gottenVideos = videos.data.data.videos ? videos.data.data.videos : videos.data.data
                if (gottenVideos.length > 0) {
                    setVideos((prevVideo) => [...prevVideo, ...gottenVideos])
                    //console.log(gottenVideos);
                }

                if (gottenVideos.length == 0 || gottenVideos.length < pageLimit) {
                    setLoading(false)
                }

            }
            else {
                setLoading(false)
            }

            // return
        } catch (error) {
            //console.log(error)
            setError(true)
            // return
        }
    }


    //This adds handleScroll functions as window's scroll event listener so it gets called wile scrolling 
    useEffect(() => {
        resetStates()
        const handleScroll = async () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= documentHeight - bottomGapToCallNextPage) {
                setAtBottom(true);
                //console.log('Reached the bottom of the page!');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    //Use effect to getVideos when page number changes
    useEffect(() => {
        getVideos()
    }, [page])

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false; 
            return; 
          }

        if (query != "") {
            resetStates()
            getVideos()
        }
    },[query])


    //Use effect to update page number when reached the bttom of th epage 
    useEffect(() => {
        //console.log("Lengthh  ", videos.length)
        if (atBottom && loading) {
            setPage((prevPage) => prevPage + 1)
        }
    }, [atBottom])


    return [videos, loading, error]
}

export default getPaginatedVideos