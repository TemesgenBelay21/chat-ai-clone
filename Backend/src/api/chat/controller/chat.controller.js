import {createConversationService} from "../service/chat.service.js";
import { GoogleGenAI } from "@google/genai";


const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

const createGeminiClinet = () => {
     if(!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined")  ;
     }

     return new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
}

async function main() {
    try {
        const ai = createGeminiClinet(); 
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: "define what is express js in a simple term",
        });
        console.log(response.text);
    } catch (error) {
        console.error("Gemini API Error:", error.message);
    }
}

main();

async function createConversationController(req,res) {
    try {
        const result = await createConversationService(req.body);
        res.status(201).json({
            satus:true,
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