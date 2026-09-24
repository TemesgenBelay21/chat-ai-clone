import { useRef, useState } from 'react';
import { ArrowUp, Mic, Plus } from 'lucide-react';
import styles from './ChatInput.module.css';

export const MAX_PROMPT_LENGTH = 4000;

export default function ChatInput({ handleSendMessage, isLoading }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const autoGrow = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    autoGrow();
  };

  const resetHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
  };

  const sendMessage = () => {
    if (!input.trim() || isLoading) return;

    handleSendMessage(input.trim());
    setInput('');
    resetHeight();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;

    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || !e.shiftKey)) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showCounter = input.length > MAX_PROMPT_LENGTH * 0.9;
  const remaining = MAX_PROMPT_LENGTH - input.length;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button
          type='button'
          className={styles.icon}
          aria-label='Add attachment'
          disabled={isLoading}
        >
          <Plus size={20} />
        </button>
        <textarea
          ref={textareaRef}
          rows={1}
          maxLength={MAX_PROMPT_LENGTH}
          className={styles.input}
          placeholder='Ask anything'
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {showCounter && (
          <span className={styles.charCount} aria-live='polite'>
            {remaining}
          </span>
        )}
        {input.trim() ? (
          <button
            type='submit'
            className={styles.submitBtn}
            disabled={isLoading}
          >
            <ArrowUp size={18} />
          </button>
        ) : (
          <>
            <button
              type='button'
              className={styles.icon}
              aria-label='Voice input'
              disabled={isLoading}
            >
              <Mic size={20} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
