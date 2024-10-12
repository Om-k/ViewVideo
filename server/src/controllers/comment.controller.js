import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
	
	if(!videoId){
		throw new ApiError(404,"Video ID required")
	}

	const offset = (page-1) * limit
	const comments = await Comment.find({video:videoId}).skip(offset).limit(limit).populate('owner', 'username avatar')

	if(!comments){
		throw new ApiError(500,"Did not get comments")
	}

	return res.
	status(200).
	json(new ApiResponse(200,comments,"Video comments gotten successfully"))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
	const { comment } = req.body;	
	const { videoId } = req.params;

	// console.log(req)
	const userId = req.user?._id

	if(!userId){
		throw new ApiError(400,"/user not logged in")
	}

	// console.log("Comment:" + comment)
	// console.log("VidID:" + videoId)
	
	if(!comment || !videoId){
		throw new ApiError(400,"Comment content and Video ID needed!")
	}
	
	const addedComment = await Comment.create({ content: comment, video: videoId, owner: userId});
	if(!addedComment){
		throw new ApiError(500,"Comment not added")
	}
	
	return res.
	status(200).
	json(new ApiResponse(200,addedComment,"Comment successfully added"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
	const {commentId} = req.params
	const {comment} = req.body

	if(!commentId){
		throw new ApiError(404,"Comment ID needed")
	}	
	
	const currComment = await Comment.findById(commentId)
	if(!currComment){
		throw new ApiError(404,"Comment does'nt exist")
	}

	// if(!newComment){
	// 	throw new ApiError(404,"Altered comment needed")
	// }

	const updatedComment = await Comment.findByIdAndUpdate(commentId,{content:comment},{new:true})

	if(!updatedComment){
		throw new ApiError(500,"Comment not updated")
	}

	return res.
	status(200).
	json(new ApiResponse(200,updatedComment,"Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
	const {commentId} = req.params

	if(!commentId){
		throw new ApiError(400,"Comment ID name needed")
	}
	
	const comment = await Comment.findById(commentId)
	if(!comment){
		throw new ApiError(404,"Comment does'nt exist")
	}	
	
	const deltedCommentResp = await Comment.findByIdAndDelete(commentId)
	
	if(!deltedCommentResp){
		throw new ApiError(404,"Comment not deleted")
	}

	return res.
	status(200).
	json(new ApiResponse(200,deltedCommentResp,"Comment deleted!"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }