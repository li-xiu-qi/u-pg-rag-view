import React, {useEffect, useRef} from 'react';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';

function DisplayMessage({message, currentRoundWebSearchData}) {
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [message]);

    return (
        <div className="display-message">
            <img src={message.avatar} alt="avatar" className="avatar"/>
            <div className="message-content">
                {message.role === 'assistant' ? (
                    <AssistantMessage message={message} currentRoundWebSearchData={currentRoundWebSearchData}/>
                ) : (
                    <UserMessage message={message}/>
                )}
                <div ref={messageEndRef}/>
            </div>
        </div>
    );
}

export default DisplayMessage;