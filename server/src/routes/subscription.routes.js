import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
    subscriptionStatus
} from "../controllers/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId").post(toggleSubscription);

router.route("/subscribedChannels").get(getSubscribedChannels)

router.route("/subStatus/:channelId").get(subscriptionStatus)

router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router