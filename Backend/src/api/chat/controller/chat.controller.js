import {createConversationService} from "../service/chat.service.js";

async function createConversationController(req,res) {
    try {
        const result = await createConversationService(req.body);
        res.send(result)
    } catch(error) {
        throw error;
    }
   
}

async function getConversationController(req,res) {
    try{
          res.send("get conversation api");
    }catch(error) {
         throw error;
    }
   
}


export {
    createConversationController,
    getConversationController
}