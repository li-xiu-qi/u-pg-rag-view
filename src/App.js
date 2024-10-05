import React from 'react';
import './styles/reset.css';

import './styles/App.css';
import './styles/chatInputContainer.css';
import './styles/chatWindow.css';
import './styles/rightSidebar.css';
import './styles/leftSidebar.css';
import './styles/chatWindow.css';
import './styles/chatContainer.css';
import './styles/displayMessage.css';
import './styles/webSearchData.css';
import "./styles/chatContext.css";
import "./styles/message.css";
import ChatWindow from './components/ChatWindow';
import LeftSidebar from "./components/LeftSidebar";

function App() {
    return (
        <div className="App">
            <LeftSidebar/>
            <ChatWindow/>

        </div>
    );
}

export default App;
