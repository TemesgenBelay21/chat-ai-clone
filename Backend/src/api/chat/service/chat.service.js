
import db from "../../../../db/db.config.js";
import { GoogleGenAI } from "@google/genai";

const CONVERSATION_COLUMNS = "id, role, content, created_at";

const createGeminiClient = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined");
    }
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

const getRecentConversations = async (limit = 5) => {

    const normalizedLimit = Number.parseInt(limit,10);
    const safeLimit = Number.isNaN(normalizedLimit) ? 5 : normalizedLimit;  

    const [rows] = await db.execute(
        `select ${CONVERSATION_COLUMNS} from conversations order by id asc limit ${safeLimit} `
    )
    return rows;
}

const generateAssistantAnswer = async (prompt, historyRows) => {
    const formatedHistory = historyRows.map(row => {
        return {
            role: row.role === "assistant" ? "model" : "user",
            parts:[{ text: row.content }],
        };
    });

    const client = createGeminiClient();
    const chat = client.chats.create({
        model: process.env.GEMINI_MODEL,
        history: formatedHistory,
    });

    const stream = await chat.sendMessageStream({ message: prompt });
    let fullText = "";
    let totalToken = 0;
    for await (const chunk of stream) {
        fullText += chunk.text ?? "";
        totalToken = chunk.usageMetadata?.totalTokenCount ?? totalToken;
    }
    return { text: fullText, totalToken };
}

const getMessageById = async (id) => {
    const [rows] = await db.execute(
        `select ${CONVERSATION_COLUMNS} from conversations where id = ?`, [id]
    )
    
    if(!rows[0]) return null;
    return {
        id: rows[0].id,
        role: rows[0].role,
        content: rows[0].content,
        tokenCount: Number(rows[0].token_count || 0),
        created_at: rows[0].created_at
    }
}


async function createConversationService(body) {
    if (!body.prompt.trim()) {
        const error = new Error("prompt not found")
        error.status = 400;
        throw error;
    }

    const historyRows = await getRecentConversations(5);
    const [userResult] = await db.execute("insert into conversations (role,content) values('user',?)", [body.prompt]);
    const { text: assistantAnswer, totalToken: assistantTotalTokens } = await generateAssistantAnswer(body.prompt, historyRows);

    const [assistantResult] = await db.execute("insert into conversations (role,content,token_count) values('assistant',?,?)", [assistantAnswer, assistantTotalTokens]);

    const userConversation = await getMessageById(userResult.insertId);
    const assistantConversation = await getMessageById(assistantResult.insertId);

    return {
        userConversation,
        assistantConversation
    };
}

export { createConversationService, getRecentConversations }
