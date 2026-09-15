
import express from "express"
import chatRouter from "./chat/chat.routes.js";


const mainRouter = express.Router();

mainRouter.use("/chat",chatRouter);


mainRouter.get("/", (req ,res) => {
    try{
        res.send("api is working");
    } catch (error) {
        console.error(error)
        res.status(500).send("internal server error");
    }
})

export default mainRouter;