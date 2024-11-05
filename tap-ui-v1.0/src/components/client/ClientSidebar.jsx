// src/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBriefcase, faList, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const ClientSidebar = () => {
    return (
        <div className="flex flex-col h-screen bg-[#27235c] text-white w-64 fixed top-0 left-0 shadow-md">
            <div className="flex items-center justify-center h-16 border-b border-gray-300">
                <h1 className="text-xl font-bold">My Dashboard</h1>
            </div>
            <nav className="flex-grow flex flex-col p-2"> {/* Adjusted padding */}
                <ul className="flex flex-col  flex-grow space-y-0"> {/* Set space-y to 0 for no spacing */}
                    <li className="flex items-center p-1 rounded hover:bg-grey-500 hover:bg-opacity-20 transition duration-200"> {/* Reduced padding */}
                        <FontAwesomeIcon icon={faTachometerAlt} className="mr-2 text-white" />
                        <a href="/" className="hover:text-blue-400">Dashboard</a>
                    </li>
                    <li className="flex items-center p-1 rounded hover:bg-grey-500 hover:bg-opacity-20 transition duration-200">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-white" />
                        <a href="#post-requirement" className="hover:text-blue-400">Post Requirement</a>
                    </li>
                    <li className="flex items-center p-1 rounded hover:bg-grey-500 hover:bg-opacity-20 transition duration-200">
                        <FontAwesomeIcon icon={faList} className="mr-2 text-white" />
                        <a href="#view-all-requirements" className="hover:text-blue-400">View All Requirements</a>
                    </li>
                    <li className="flex items-center p-1 rounded hover:bg-grey-500 hover:bg-opacity-20 transition duration-200">
                        <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-white" />
                        <a href="#view-interviews" className="hover:text-blue-400">View Interviews</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ClientSidebar;