import styles from './ChatMessage.module.css';

function ChatMessage({ content }) {
  return <div className={styles.message}>{content}</div>;
}

export default ChatMessage;