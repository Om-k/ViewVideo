import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    try {
        const userId = req.user._id;
    
        // Get total number of subscribers
        const totalSubscribers = await Subscription.countDocuments({ channel: userId });
    
        // Get all videos by this user
        const videos = await Video.find({ owner: userId });
    
        // Calculate total views and total number of videos
        const totalVideos = videos.length;
        const totalViews = videos.reduce((sum, video) => sum + (video.views || 0), 0);
    
        // Get total likes on the user's videos
        const totalLikes = await Like.countDocuments({
          video: { $in: videos.map(video => video._id) }
        });
    
        // Send response with the calculated stats
        return res.status(200).json(new ApiResponse(200,{
            totalSubscribers:totalSubscribers,
            totalVideos:totalVideos,
            totalViews:totalViews,
            totalLikes:totalLikes,
        },"User dashboard data fetched successfully"));
      } catch (error) {
        throw new ApiError(500,'Error retrieving channel statistics'+error)
      }

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    throw new ApiError(500,"PLeasse do a api call to /videos/?userId=userId")
})

export {
    getChannelStats, 
    getChannelVideos
    }