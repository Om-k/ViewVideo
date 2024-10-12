import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
	const { name, description } = req.body
	const userID = req.user._id

	//TODO: create playlist
	if (!name) {
		throw new ApiError(400, "Playlist name needed")
	}

	let playlistData = { name: name, owner: userID }

	const existingPlaylist = await Playlist.find(playlistData)

	console.log(existingPlaylist)

	if (existingPlaylist?.length > 0) {
		throw new ApiError(404, "Playist with that name already exists")
	}

	if (description) {
		playlistData.description = description
	}

	playlistData.thumbnail = "";

	const playlist = await Playlist.create(playlistData)

	if (!playlist) {
		throw new ApiError(500, "Error while creating playlist")
	}

	return res.
		status(200).
		json(new ApiResponse(200, playlist, "PLaylist is created"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
	const { userId } = req.params
	//TODO: get user playlists
	const playlists = await Playlist.find({ owner: userId })

	if (!playlists) {
		throw new ApiError(500, "No Playlists found")
	}

	return res.
		status(200).
		json(new ApiResponse(200, playlists, "Users playlists"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
	const { playlistId } = req.params
	//TODO: get playlist by id

	if (!playlistId) {
		throw new ApiError(400, "Playlist ID name needed")
	}

	let playlist = await Playlist.findById(playlistId).populate({
		path: 'videos',
		populate: {
			path: 'owner'
		}
	}).populate('owner').exec();

	if (!playlist) {
		throw new ApiError(500, "Playlist doesn't exist")
	}

	return res.
		status(200).
		json(new ApiResponse(200, playlist, "Playlist returned!"))

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
	const { playlistId, videoId } = req.params

	if (!playlistId || !videoId) {
		throw new ApiError(400, "playlistId and videoId needed")
	}

	const video = await Video.findById(videoId);
	if (!video) {
		throw new ApiError(404, "Video doesnt exist")
	}

	const playlist = await Playlist.findById(playlistId);

	if (!playlist) {
		throw new ApiError(404, "Playlist not found");
	}

	let updatedPlaylist = {};
	if (!playlist.videos.includes(videoId)) {
		await playlist.videos.push(videoId);
		// updatedPlaylist = await playlist.save();
	}
	else {
		throw new ApiError(400, "Video already in playlist")
	}

	if (!playlist.thumbnail || playlist?.thumbnail == "") {
		//await Playlist.findByIdAndUpdate(playlistId,{thumbnail:video.thumbnail});
		playlist.thumbnail = video.thumbnail
	}

	updatedPlaylist = await playlist.save();


	return res.
		status(200).
		json(new ApiResponse(200, updatedPlaylist, "Video added to the playlist"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
	const { playlistId, videoId } = req.params
	// TODO: remove video from playlist

	if (!playlistId || !videoId) {
		throw new ApiError(400, "playlistId and videoId are required");
	}

	const playlist = await Playlist.findById(playlistId);
	if (!playlist) {
		throw new ApiError(404, "Playlist not found");
	}

	if (!playlist.videos.includes(videoId)) {
		throw new ApiError(404, "Video not found in the playlist");
	}

	playlist.videos = playlist.videos.filter(id => id.toString() !== videoId);

	const updatedPlaylist = await playlist.save();

	return res.
		status(200).
		json(new ApiResponse(200, updatedPlaylist, "Video removed from the playlist"))
})

const deletePlaylist = asyncHandler(async (req, res) => {
	const { playlistId } = req.params
	// TODO: delete playlist
	if (!playlistId) {
		throw new ApiError(400, "Playlist ID name needed")
	}

	const playlist = await Playlist.findById(playlistId)
	if (!playlist) {
		throw new ApiError(404, "PLaylist does'nt exist")
	}

	const deltedPlaylistResp = await Playlist.findByIdAndDelete(playlistId)

	return res.
		status(200).
		json(new ApiResponse(200, deltedPlaylistResp, "Playlist Deleted!"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
	const { playlistId } = req.params
	const { name, description } = req.body
	//TODO: update playlist
	if (!playlistId) {
		throw new ApiError(400, "Playlist ID name needed")
	}

	if (!name && !description) {
		throw new ApiError(400, "Name or description needed")
	}

	let updateVals = {}
	if (name) { updateVals.name = name }
	if (description) { updateVals.description = description }

	const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, updateVals, { new: true })

	if (!updatedPlaylist) {
		throw new ApiError(500, "PLaylist not updated")
	}

	return res.
		status(200).
		json(new ApiResponse(200, updatedPlaylist, "Playlist updated"))
})

export {
	createPlaylist,
	getUserPlaylists,
	getPlaylistById,
	addVideoToPlaylist,
	removeVideoFromPlaylist,
	deletePlaylist,
	updatePlaylist
}