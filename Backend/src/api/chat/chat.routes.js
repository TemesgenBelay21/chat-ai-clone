import express from "express"
import { createConversationController, getConversationController } from "./controller/chat.controller.js";
import { healthHandler } from "../health-handler.js";

const chatRouter = express.Router();

chatRouter.get("/", healthHandler("chat api is working"));

chatRouter.post("/conversations", createConversationController);

chatRouter.get("/conversations" , getConversationController);

export default chatRouter;