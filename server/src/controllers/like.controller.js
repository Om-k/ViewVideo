import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user._id
    //TODO: toggle like on video

    if (!videoId) {
        throw new ApiError(404, "Video ID required")
    }

    const isLiked = await Like.findOne({ video: videoId, likedBy: userId })

    if (isLiked) {
        const likedData = await Like.findOneAndDelete({ video: videoId, likedBy: userId })

        if (!likedData) {
            throw new ApiError(500, "Like not updated")
        }

        return res.
            status(200).
            json(new ApiResponse(200, likedData, "Video disliked successfully"))
    }
    else {
        const likedData = await Like.create({ video: videoId, likedBy: userId })

        if (!likedData) {
            throw new ApiError(500, "Like not updated")
        }

        return res.
            status(200).
            json(new ApiResponse(200, likedData, "Video liked successfully"))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const userId = req.user._id
    //TODO: toggle like on comment

    if (!commentId) {
        throw new ApiError(404, "Video ID required")
    }

    const isLiked = await Like.findOne({ comment: commentId, likedBy: userId })

    if (isLiked) {
        const likedData = await Like.findOneAndDelete({ comment: commentId, likedBy: userId })

        if (!likedData) {
            throw new ApiError(500, "Like not updated")
        }

        return res.
            status(200).
            json(new ApiResponse(200, likedData, "Comment disliked successfully"))
    }
    else {
        const likedData = await Like.create({ comment: commentId, likedBy: userId })

        if (!likedData) {
            throw new ApiError(500, "Like not updated")
        }

        return res.
            status(200).
            json(new ApiResponse(200, likedData, "Comment liked successfully"))
    }
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId = req.user._id
    const { videoId, } = req.params

    const likedVideos = await Like.find({ likedBy: userId, video: { $ne: null } });

    if (!likedVideos) {
        throw new ApiError(500, "Liked videos not found")
    }

    return res.
        status(200).
        json(new ApiResponse(200, likedVideos, "Videos liked by the user"))
})

const checkVideoLike = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    const userId = req.user._id

    try {

        const likedVideos = await Like.find({ video: videoId, likedBy: userId });

        let liked = false
        if (likedVideos.length>0) {
            liked = true
        }

        return res.
            status(200).
            json(new ApiResponse(200, liked, ""))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Server error"));
    }
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    checkVideoLike
}