import React, {useRef, useState, useEffect} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ChatInputContainer = ({inputValue, setInputValue, handleSendMessage}) => {
    const textareaRef = useRef(null);
    const MAX_LENGTH = 4000;
    const [warning, setWarning] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputValue.length > MAX_LENGTH) {
                setWarning('输入内容不能超过4000字，请精简输入内容。');
            } else {
                handleSendMessage();
            }
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => setWarning(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [warning]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [inputValue]);

    return (
        <div className="chat-input-container">
            <div className="chat-input">
                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="你想知道些什么？"
                    className="content-editable"
                    style={{overflowY: 'auto', maxHeight: '150px'}}
                />
                <button onClick={() => {
                    if (inputValue.length > MAX_LENGTH) {
                        setWarning('输入内容不能超过4000字，请精简输入内容。');
                    } else {
                        handleSendMessage();
                    }
                }}>
                    <i className="fas fa-paper-plane"></i>
                </button>
                {warning && <div className="warning">{warning}</div>}
            </div>
        </div>
    );
};

export default ChatInputContainer;