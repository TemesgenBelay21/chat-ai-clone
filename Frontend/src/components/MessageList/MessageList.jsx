import styles from "./MessageList.module.css";

function MessageList({ conversations }) {
  return (
    <div className={styles.messages}>
      {conversations.length === 0 ? (
        <div className={styles.empty}>What are you working on?</div>
      ) : (
        conversations.map((conversation) => (
          <div key={conversation.id} className={styles.message}>
            <div className={styles.role}>{conversation.role}</div>
            <div className={styles.content}>{conversation.content}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;