import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params //Check how the userId is acced in other places
    const userId = req.user._id
    // TODO: toggle subscription
	
	if(!channelId){
		throw new ApiError(404,"Channel ID needed")
	}
	
	const subscriptionObj = await Subscription.findOne({subscriber:userId,channel:channelId})
	
	if(subscriptionObj){
		const delSubObj = await Subscription.findByIdAndDelete(subscriptionObj._id)
		if(!delSubObj){
				throw new ApiError(500,"User not unsubscribed")
		}
		
		return res.
		status(200).
		json(new ApiResponse(200,delSubObj,"User successfully unsubscribed"))
	}
	else{
		const addedSubs = await Subscription.create({ subscriber: userId, channel: channelId });
		if(!addedSubs){
				throw new ApiError(500,"User not subscribed")
		}
		
		return res.
		status(200).
		json(new ApiResponse(200,addedSubs,"User successfully subscribed"))
	}	
		
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {subscriberId} = req.params
	if(!subscriberId){
		throw new ApiError(404,"Channel ID needed")
	}

	const channelSubscribers = await Subscription.find({channel:subscriberId})
	if(!channelSubscribers){
		throw new ApiError(400,"No subscribers")
	}
	
	return res.
	status(200).
	json(new ApiResponse(200,channelSubscribers,"Channels subscribed to"))	
})



// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
	const subscriberId = req.user._id
	console.log(subscriberId)
	if(!subscriberId){
		throw new ApiError(404,"Subscriber ID needed")
	}

	 const subscribedChannels = await Subscription.find({ subscriber: subscriberId })
        .populate({
            path: 'channel',
            select: 'name description'
        });

	if(!subscribedChannels){  //May not be needed
		throw new ApiError(400,"No channels subscribed to")
	}
	
	return res.
	status(200).
	json(new ApiResponse(200,subscribedChannels,"Channels subscribed to"))	
})

const subscriptionStatus = asyncHandler(async (req, res) => {
	const { channelId } = req.params
	const userId = req.user._id

	const subscribedObj = await Subscription.find({subscriber:userId,channel:channelId})

	if(!subscribedObj){
		throw new ApiError(500,"Subscription data is not fetched")
	}

	if(subscribedObj.length>0){
		return res.
		status(200).
		json(new ApiResponse(200,{subscribed:true},"User is subscribed to the channel"))
	}
	else{
		return res.
		status(200).
		json(new ApiResponse(200,{subscribed:false},"User is not subscribed to the channel"))
	}

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
	subscriptionStatus
}