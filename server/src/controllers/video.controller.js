import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCLoudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import fs from "fs"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"

const getAllVideos = asyncHandler(async (req, res) => {
    /*
    page: page number you want to acces
    limit: limit in the number of videos in a page
    query: search string values if empty gives all videos
    sortBy: by what attribute of the model you want to sort
    sortType: asc=ascending or desc=descending
    userId: if u want to get videos from a particular user  
    */
    const { page = 1, limit = 10, query = "", sortBy = "title", sortType = "asc", userId = "" } = req.query;

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;
    // Construct the filter object based on the query and userId
    let filter = { isPublished: true };
    if (query) {
        filter = { ...filter, title: new RegExp(query, 'i') }; // Example filter by title (case-insensitive)
    }
    if (userId) {
        filter = { ...filter, owner: userId };
    }

    // Construct the sort object
    let sort = {};
    if (sortBy) {
        sort[sortBy] = sortType === 'desc' ? -1 : 1;
    }

    try {
        // Fetch the videos from the database based on the filter, sort, and pagination
        const videos = await Video.find(filter)
            .populate('owner', 'username avatar')
            .sort(sort)
            .skip(offset)
            .limit(limit);

        // Get the total count for pagination purposes
        const totalVideos = await Video.countDocuments(filter);

        const retVid = {
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(totalVideos / limit),
            totalVideos,
            videos,
        };

        return res.status(200).json(
            new ApiResponse(200, retVid, "Videos requested")
        );
    } catch (error) {
        throw new ApiError(500, "Somthing went wrong while accessssing the videos", [error])
    }
});

const publishAVideo = asyncHandler(async (req, res) => {
    // TODO: get video, upload to cloudinary, create video

    // get user details from front end
    // validation of data - not empty
    // upload the required data to cloudinary
    // create user object - create entry to db
    // check for result creation (if created or not)
    // return res

    const { title, description } = req.body
    const userId = req.user?._id

    if (!title.trim() === "") {
        throw new ApiError(400, "Title is required")
    }

    // console.log(req)
    console.log("body", req.body)
    console.log("Files", req.files)
    const vidLocalPath = await req.files?.videoFile[0]?.path
    const thumbnailLocalPath = await req.files?.thumbnail[0]?.path

    if (!vidLocalPath || !thumbnailLocalPath) {
        throw new ApiError(400, "Video and thumbnail are required")
    }

    const video = await uploadOnCLoudinary(vidLocalPath)
    const thumbnail = await uploadOnCLoudinary(thumbnailLocalPath)

    if (!video || !thumbnail) {
        throw new ApiError(400, "Video and thumbnail are required")
    }

    const vidData = await Video.create({
        videoFile: video.url,
        thumbnail: thumbnail.url,
        title: title,
        description: description,
        duration: video.duration,
        owner: userId
    })

    const createdVid = await Video.findOne(vidData._id)

    if (!createdVid) {
        throw new ApiError(500, "Something went wrong while uploading the video")
    }

    return res.status(201).json(
        new ApiResponse(200, createdVid, "Video has been uploaded successfully")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user?._id

    let subscriptionData = {
        disabled: true,
        subscribed: false
    }

    //TODO: get video by id
    if (!videoId) {
        throw new ApiError(400, "videoId required")
    }

    try {
        const video = await Video.findOne({
            _id: videoId
        }).populate('owner', 'username avatar')

        if (!video) {
            throw new ApiError(500, "Video does'nt exist")
        }

        video.views = (video.views || 0) + 1;
        await video.save();

        if (userId) {
            await updateUserHistory(userId, videoId)
            
            subscriptionData.disabled = video.owner._id.equals(userId)
            console.log(video.owner._id, userId,video.owner._id.equals(userId))

            const subscribedObj = await Subscription.find({subscriber:userId,channel:video.owner._id})
            subscriptionData.subscribed = subscribedObj.length>0

        }

        return res.status(200).json(
            new ApiResponse(200, {...video._doc,subscriptionData:subscriptionData}, "Video requested")
        );
    }
    catch (error) {
        throw new ApiError(500, "Somthing went wrong while accessssing the video", [error])
    }

})

const updateUserHistory = async (userId, videoId) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                watchHistory: { $each: [videoId], $position: 0 } // Adds videoId at the beginning
            }
        },
        { new: true }
    ).select("-password");

    // console.log("Updated watch history:", updatedUser.watchHistory);
}

const getMultipleVideosByIds = asyncHandler(async (req, res) => {
    const { videoIds } = req.body; 


    if (!videoIds || !Array.isArray(videoIds)) {
        throw new ApiError(400, "An array of videoIds is required");
    }

    try {
        const videos = await Promise.all(
            videoIds.map(async (videoId) => {
                return await Video.findById(videoId);
            })
        );

        const foundVideos = videos.filter(video => video !== null);

        return res
            .status(200)
            .json(new ApiResponse(200, foundVideos, "Videos fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "An error occurred while fetching videos");
    }
});


const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body
    const thumbnailLocalPath = req?.file?.path


    if (!videoId) {
        throw new ApiError(400, "Video ID required")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        if (thumbnailLocalPath) {
            fs.unlinkSync(thumbnailLocalPath);
        }
        throw new ApiError(400, "Video does'nt exist")
    }

    const thumbnail = await uploadOnCLoudinary(thumbnailLocalPath)

    const updates = {};
    if (thumbnail) updates.thumbnail = thumbnail.url;
    if (title) updates.title = title;
    if (description) updates.description = description;

    const updatedVid = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: updates
        },
        { new: true }
    )

    if (!updatedVid) {
        if (thumbnailLocalPath) {
            fs.unlinkSync(thumbnailLocalPath);
        }
        throw new ApiError(400, "Video not updated")
    }

    return res.
        status(200).
        json(new ApiResponse(200, updatedVid, "Video updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    const currVid = await Video.findById(videoId)
    if (!currVid) {
        throw new ApiError(500, "Video does'nt exist")
    }

    const vidResponse = await deleteFromCloudinary(currVid.videoFile, "video")
    const thumbnailResponse = await deleteFromCloudinary(currVid.thumbnail, "image")

    if (!vidResponse || !thumbnailResponse) {
        throw new ApiError(500, "Error while deleting the video data")
    }


    await Video.deleteOne({ _id: videoId }).then(function () {
        return res.status(200).json(
            new ApiResponse(200, currVid, "Video deleted")
        );
    })
        .catch(function () {
            throw new ApiError(500, "Error while deleting the video")
        })

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId) {
        throw new ApiError(400, "Video ID needed!")
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(400, "Video doesn't exist");
    }

    const updatedVid = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !video.isPublished
            }
        },
        { new: true }
    )

    if (!updatedVid) {
        throw new ApiError(400, "Error while updating")
    }

    return res.
        status(200).
        json(new ApiResponse(200, updatedVid, "Video publish status updated"))

})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    getMultipleVideosByIds,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}