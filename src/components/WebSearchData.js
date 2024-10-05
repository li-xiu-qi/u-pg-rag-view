import React, {useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

function WebSearchData({currentRoundWebSearchData}) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const lis = currentRoundWebSearchData.map((data, index) => {
        const webSearch = JSON.parse(data.web_search);
        return (
            <li key={index} className="web-search-item">
                <img src={webSearch.favicon} alt={webSearch.title}/>
                <a href={webSearch.href} target="_blank" rel="noreferrer">{webSearch.title}</a>[{webSearch.date}]
            </li>
        );
    });

    return (
        <div className={`web-search-data ${expanded ? 'expanded' : ''}`}>
            <div className="web-search-data-header" onClick={toggleExpanded}>
                <h3>网络搜索结果</h3>
                <button>
                    {expanded ? <FaChevronUp/> : <FaChevronDown/>}
                </button>
            </div>
            {expanded && <ul>{lis}</ul>}
        </div>
    );
}

export default WebSearchData;