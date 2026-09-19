import { User, Bot } from 'lucide-react';
import styles from './ChatMessage.module.css';

function ChatMessage({ role, content }) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div className={styles.avatar}>
        {role === 'user' ? (
          <User size={18} color='white' />
        ) : (
          <Bot size={18} color='white' />
        )}
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}

export default ChatMessage;