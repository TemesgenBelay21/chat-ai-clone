import express from "express"
import chatRouter from "./chat/chat.routes.js";
import { healthHandler } from "./health-handler.js";

const mainRouter = express.Router();

mainRouter.use("/chat", chatRouter);

mainRouter.get("/", healthHandler("api is working"));

export default mainRouter;