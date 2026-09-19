import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from './ChatMessage.module.css';

function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div className={`${styles.avatar} ${styles[role]}`}>
        {isUser ? (
          <User size={18} color='white' />
        ) : (
          <Bot size={18} color='white' />
        )}
      </div>
      {isUser ? (
        <div className={styles.content}>{content}</div>
      ) : (
        <div className={styles.markdownBody}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;