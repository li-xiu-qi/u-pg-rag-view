import React from 'react';

function UserMessage({message}) {
    return (
        <div className="user-message">
            <p>{message.content}</p>
        </div>
    );
}

export default UserMessage;