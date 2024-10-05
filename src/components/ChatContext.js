import React from 'react';
import DisplayMessage from './DisplayMessage';

function ChatContext({messages, webSearchData}) {


    return (
        <div className="chat-context">
            {messages.map((message, index) => (
                <DisplayMessage
                    key={index}
                    message={message}
                    currentRoundWebSearchData={webSearchData.filter((data) => data.round === message.round)}
                />
            ))}
        </div>
    );
}

export default ChatContext;