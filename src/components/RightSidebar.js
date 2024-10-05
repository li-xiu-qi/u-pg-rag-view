import React, {useState} from 'react';

const RightSidebar = ({rightSidebarData}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className={`right-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-content">
                    {rightSidebarData.map((linkResource, index) => (
                        <div key={index} className="link-resource-section">
                            <h3>Link Resource {index + 1}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isExpanded ? '→' : '←'}
            </button>
        </>
    );
};

export default RightSidebar;