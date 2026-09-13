import db from "../../../../db/db.config.js";

const getRecentConversations = async (limit = 5) => {

    const normalizedLimit = Number.parseInt(limit,10);
    const safeLimit = Number.isNaN(normalizedLimit) ? 5 : normalizedLimit;  

    const [rows] = await db.execute(
        `select id, role, content, created_at from conversations order by id desc limit ${safeLimit} `
    )
    return rows.reverse();
}


async function createConversationService(body) {
    try {

        if (!body.prompt.trim()) {
            const error = new Error("prompt not found")
            error.status = 400;
            throw error;
        }

        const historyRows = await getRecentConversations(5);
        const [result] = await db.execute("insert into conversations (role,content) values('user',?)", [body.prompt]);

        return {
            historyRows,
        };
    } catch (error) {
        throw error;
    }


}

export { createConversationService }