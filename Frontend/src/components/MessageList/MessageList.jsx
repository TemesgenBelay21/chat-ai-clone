import styles from "./MessageList.module.css";
import ChatMessage from "../ChatMessage/ChatMessage";

function MessageList({ conversations }) {
  return (
    <div className={styles.messages}>
      {conversations.length === 0 ? (
        <div className={styles.empty}>What are you working on?</div>
      ) : (
        conversations.map((conversation) => (
          <ChatMessage
            key={conversation.id}
            role={conversation.role}
            content={conversation.content}
          />
        ))
      )}
    </div>
  );
}

export default MessageList;