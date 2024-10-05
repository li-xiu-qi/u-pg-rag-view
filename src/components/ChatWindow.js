import React from 'react';
import useChatbot from '../hooks/useChatbot';
import RightSidebar from './RightSidebar';
import ChatInputContainer from "./ChatInputContainer";
import ChatContainer from "./ChatContainer";

const ChatWindow = () => {
    const {
        messages,
        inputValue,
        setInputValue,
        handleSendMessage,
        rightSidebarData,
    } = useChatbot();

    return (
        <div className={"chat-window"}>
            <ChatContainer
                messages={messages}
                webSearchData={rightSidebarData.filter((data => data.type === "web_search"))}
            >
            </ChatContainer>

            <ChatInputContainer
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSendMessage={handleSendMessage}>
            </ChatInputContainer>
            <RightSidebar rightSidebarData={rightSidebarData}/>
        </div>
    );
};

export default ChatWindow;