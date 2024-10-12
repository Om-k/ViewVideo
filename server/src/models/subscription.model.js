import mongoose,{mongo, Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //The one subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, //The one to whom subscriber is subscribing  
        ref: "User"
    },
},{timestamps: true});

export const Subscription = mongoose.model("Subscription",subscriptionSchema)