
import express from 'express';
import 'dotenv/config';
import db from './db/db.config.js';
import mainRouter from './src/api/main.routes.js';


const app = express();

app.use(express.json());
app.use("/api", mainRouter);


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
