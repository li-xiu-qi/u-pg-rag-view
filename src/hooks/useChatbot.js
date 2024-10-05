import {useState} from 'react';

const useChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [round, setRound] = useState(1);
    const [rightSidebarData, setRightSidebarData] = useState([]);
    let [currentAssistantMessage, setCurrentAssistantMessage] = useState('');

    // 更新右侧边栏数据
    const updateRightSidebarData = (type, result) => {
        setRightSidebarData(prevData => {
            if (!result) {
                return prevData;
            }
            const updatedData = [...prevData];
            updatedData.push({
                round: round,
                type: type,
                [type]: result
            });
            return updatedData;
        });
    };


    // 数据类型处理器
    const dataTypeHandlers = {
        'assistant': (jsonData) => {
            setCurrentAssistantMessage(prev => prev + jsonData.result);
            const answerMessage = {
                role: 'assistant',
                content: currentAssistantMessage += jsonData.result,
                avatar: '/assistant-avatar-url.png',
                round: round
            };
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                if (lastMessage && lastMessage.role === 'assistant' && lastMessage.round === round) {
                    lastMessage.content = answerMessage.content;
                } else {
                    updatedMessages.push(answerMessage);
                }
                return updatedMessages;
            });
        },
        'links_resources': (jsonData) => updateRightSidebarData('links_resources', jsonData.result),
        'document': (jsonData) => updateRightSidebarData('document', jsonData.result),
        'retrieval': (jsonData) => updateRightSidebarData('retrieval', jsonData.result),
        'web_search': (jsonData) => updateRightSidebarData("web_search", jsonData.result),
        'md_content': (jsonData) => updateRightSidebarData('md_content', jsonData.result)
    };

    // 获取数据
    const fetchData = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/rag_chat/stream-chat-web_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify(data)
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const {done, value} = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, {stream: true});
                const lines = buffer.split('\n');

                for (let line of lines) {
                    if (line.startsWith('data: ')) {
                        line = line.slice(5).trim();
                        if (line) {
                            try {
                                const jsonData = JSON.parse(line);
                                const handler = dataTypeHandlers[jsonData.data_type];
                                if (handler) {
                                    handler(jsonData);
                                } else {
                                    console.warn('Unknown data type:', jsonData.data_type);
                                }
                                buffer = '';
                            } catch (e) {
                                continue;
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // 处理发送消息
    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const userMessage = {
                role: 'user',
                content: inputValue,
                avatar: '/user-avatar-url.jpg',
                round: round
            };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInputValue('');

            const data = {
                query: inputValue,
                limit: 15,
                use_vector_search: true,
                use_keyword_search: true,
                rerank: true,
                keyword_weight: 7,
                vector_weight: 3,
                recursive_query: false,
                paragraph_number_ranking: true,
                filter_count: 5
            };

            await fetchData(data);

            setRound(prevRound => prevRound + 1);
            setCurrentAssistantMessage('');
        }
    };

    return {
        messages,
        inputValue,
        setInputValue,
        handleSendMessage,
        rightSidebarData
    };
};

export default useChatbot;