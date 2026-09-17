import styles from './MessageList.module.css';


function MessageList({conversations}) {
  return (
    <div>
    
    {conversations.map((conversation) => (
      <div key={conversation.id} className={styles.message}>
        <div className={styles.role}>{conversation.role}</div>
        <div className={styles.content}>{conversation.content}</div>
      </div>
    ))}
  </div>
  
}

export default MessageList