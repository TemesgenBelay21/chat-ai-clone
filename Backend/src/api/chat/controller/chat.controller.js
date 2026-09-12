
function createConversationController(req,res) {
    try {
         res.send("chat conversation api");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
   
}

function getConversationController(Req,res) {
    try{
          res.send("get conversation api");
    }catch(error) {
         res.status(500).json({ message: error.message });
    }
   
}


export {
    createConversationController,
    getConversationController
}