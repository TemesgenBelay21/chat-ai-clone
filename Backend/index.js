
import express from 'express';
import 'dotenv/config';
import db from './db/db.config.js';
const app = express();

app.post("/api/chat/conversations", async (req , res) => {
    try {
        res.send("post method");
    } catch (error) {
        console.error(error)
        res.status(500).send("internal server error");
    }
});

app.get("/api/chat/conversations" , async (req , res) => {
    try{
        res.send("get method");
    } catch (error) {
        console.error(error)
        res.status(500).send("internal server error");
    }
});

async function startServer() {
    try{
        const connection = await db.getConnection();
        connection.release();
        console.log("Database connected");
        
        app.listen(3000 , err => {
            if(err) {
                throw err;
            }
            console.log("server is running on port 3000");
        });
        } catch (error) {
            console.error("error starting the server:", error.message)
        }
    }


    startServer();
