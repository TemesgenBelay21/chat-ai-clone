import {createConversationService,getRecentConversations } from "../service/chat.service.js";


async function createConversationController(req,res) {
    const result = await createConversationService(req.body);
    res.status(201).json({
        success: true,
        message: "message posted successfully" ,
        data: result
    })
}

async function getConversationController(req,res) {
    const result = await getRecentConversations(100);
    res.status(200).json({
        success: true,
        message: "conversations fetched successfully",
        data: result
    })
}


export {
    createConversationController,
    getConversationController
}
