
import express from "express"
import { createConversationController, getConversationController } from "./controller/chat.controller.js";

const chatRouter = express.Router();


chatRouter.get("/", (req ,res) => {
    try{
        res.send("chat api is working");
    } catch (error) {
        console.error(error)
        res.status(500).send("internal server error");
    }
})

chatRouter.post("/conversations", createConversationController);

chatRouter.get("/conversations" , getConversationController);


export default chatRouter;