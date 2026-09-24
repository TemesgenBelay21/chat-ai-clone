import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Loader2, Mic, Plus } from 'lucide-react';
import styles from './ChatInput.module.css';

export const MAX_PROMPT_LENGTH = 4000;

const growTextarea = (el) => {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
};

const collapseTextarea = (el) => {
  if (!el) return;
  el.style.height = 'auto';
};

const isComposingEvent = (e) => e.nativeEvent.isComposing || e.keyCode === 229;

const isSendKey = (e) =>
  e.key === 'Enter' && (e.ctrlKey || e.metaKey || !e.shiftKey);

export default function ChatInput({
  handleSendMessage,
  isLoading,
  onTogglePlus,
  onToggleMic,
}) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    growTextarea(textareaRef.current);
  };

  const sendMessage = () => {
    if (!input.trim() || isLoading) return;

    handleSendMessage(input.trim());
    setInput('');
    collapseTextarea(textareaRef.current);
    textareaRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (isComposingEvent(e)) return;

    if (e.key === 'Escape' && input.trim()) {
      e.preventDefault();
      setInput('');
      collapseTextarea(textareaRef.current);
      return;
    }

    if (isSendKey(e)) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showCounter = input.length > MAX_PROMPT_LENGTH * 0.9;
  const remaining = MAX_PROMPT_LENGTH - input.length;

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-label='Chat message form'
      >
        <label className={styles.srOnly} htmlFor='chat-prompt'>
          Message
        </label>
        <button
          type='button'
          className={styles.icon}
          aria-label='Add attachment'
          aria-haspopup='menu'
          disabled={isLoading}
          onClick={onTogglePlus}
        >
          <Plus size={20} />
        </button>
        <textarea
          id='chat-prompt'
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
        {isLoading ? (
          <button
            type='button'
            className={styles.submitBtn}
            aria-label='Waiting for response'
            disabled
          >
            <Loader2 className={styles.spinner} size={18} />
          </button>
        ) : input.trim() ? (
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
              onClick={onToggleMic}
            >
              <Mic size={20} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
