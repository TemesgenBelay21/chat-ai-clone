
async function createConversationService(body) {
    try {
         return `chat is saved to db with question: ${body.prompt}`;
    } catch (error) {
         throw error;
    }
    
   
}

export {createConversationService}