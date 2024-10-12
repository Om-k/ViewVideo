import mongoose,{Schema} from "mongoose";

const playListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videos: [
        {
        type: mongoose.Types.ObjectId,
        ref: "Video"
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        type: String,
        default:""
    }
},{timestamps:true})


export const Playlist = mongoose.model("Playlist",playListSchema)