import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    content: {
        type: String,
        reqired: true 
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment",commentSchema)


/*
import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    content: {
        type: String,
        reqired: true 
    },
    for: {
        type: String,
        reqired: true 
    },
    comment: {
         type: mongoose.Types.ObjectId,
        ref: "Comment"
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment",commentSchema)
*/