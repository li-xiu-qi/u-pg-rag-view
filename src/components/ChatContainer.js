import React from "react";
import ChatContext from "./ChatContext";

function ChatContainer({
                           messages,
                           webSearchData
                       }) {
    return (
        <div className="chatbot-container">
            <ChatContext
                messages={messages}
                webSearchData={webSearchData}
            />
        </div>
    );
}

export default ChatContainer;