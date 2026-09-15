
import express from 'express';
import 'dotenv/config';
import db from './db/db.config.js';
import mainRouter from './src/api/main.routes.js';
import { errorHandler } from './src/api/middleware/error-handler.js';

const app = express();

app.use(express.json());
app.use("/api", mainRouter);

app.use(errorHandler);

async function startServer() {
    try {
        const connection = await db.getConnection();
        connection.release();
    } catch (error) {
        console.error("error connecting to database:", error.message);
        return;
    }

    app.listen(3000, () => {
        console.log("server is running on port 3000");
    });
}

startServer();
