import React from 'react';
import WebSearchData from './WebSearchData';

function AssistantMessage({message, currentRoundWebSearchData}) {
    return (
        <div className="assistant-message">
            {currentRoundWebSearchData.length > 0 && (
                <WebSearchData currentRoundWebSearchData={currentRoundWebSearchData}/>
            )}
            <p>{message.content}</p>
        </div>
    );
}

export default AssistantMessage;