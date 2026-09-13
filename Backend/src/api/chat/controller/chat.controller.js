import {createConversationService,getRecentConversations } from "../service/chat.service.js";


async function createConversationController(req,res) {
    try {
        const result = await createConversationService(req.body);
        res.status(201).json({
            status:true,
            message: "message posted successfully" ,
            data: result
        })
    } catch(error) {
        throw error;
    }
   
}

async function getConversationController(req,res) {
    try{
          const result = await getRecentConversations(100);
          res.status(200).json({
            success: true,
            message: "conversations fetched successfully",
            data: result
          })
    }catch(error) {
         throw error;
    }
   
}


export {
    createConversationController,
    getConversationController
}
