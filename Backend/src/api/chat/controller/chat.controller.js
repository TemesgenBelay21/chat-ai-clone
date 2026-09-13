import {createConversationService} from "../service/chat.service.js";


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
          res.send("get conversation api");
    }catch(error) {
         throw error;
    }
   
}


export {
    createConversationController,
    getConversationController
}
