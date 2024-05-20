import React, {useState} from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './HelpPage.css';
import Background from '../components/Background';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const HelpPage = () => {
    const [dropdowns, setDropdowns] = useState({
        question1: false,
        question2: false,
        question3: false,
    });

    const toggleDropdown = (question) => {
        setDropdowns((prevDropdowns) => ({
            ...prevDropdowns,
            [question]: !prevDropdowns[question],
        }));
    };

    return (
        <div className="help-page">
            <Header />
            <Navbar />
            <Background/>
            <div className="help-content">
                <h1>Health Center - Personal Account</h1>
                <h2>How can we help you?</h2>

                <div className='help-questions'>
                    <h3>Common Questions</h3>
                    <ul className="help-questions-list">
                        <li>
                            <div className="dropdown-container">
                                <div className="question" onClick={() => toggleDropdown('question1')}>
                                <FontAwesomeIcon icon={dropdowns.question1 ? faChevronUp : faChevronDown} />
                                    How Can I use the temperature device?
                                </div>
                                {dropdowns.question1 && (
                                    <div className="answer">
                                        Please read the instructions given and watch the video. You can check the video by clicking the homepage icon and then selecting the test.
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-container">
                                <div className="question" onClick={() => toggleDropdown('question2')}>
                                <FontAwesomeIcon icon={dropdowns.question2 ? faChevronUp : faChevronDown} />
                                    How can I check the test results?
                                </div>
                                {dropdowns.question2 && (
                                    <div className="answer">
                                        After completing the test, click the finish button.
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-container">
                                <div className="question" onClick={() => toggleDropdown('question3')}>
                                <FontAwesomeIcon icon={dropdowns.question3 ? faChevronUp : faChevronDown} />
                                    Can I generate a medical report with the basic package?
                                </div>
                                {dropdowns.question3 && (
                                    <div className="answer">
                                        No, you can't generate the medical report with the basic package.
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="help-footer-container">
                <div className='help-footer'>
                    <h5>More ways we can help</h5>
                    <div className="help-option">
                        <img src="/images/phone.png" alt="Phone" />
                        <span>Contact Us</span>
                    </div>
                    <div className="help-option">
                        <img src="/images/messege.png" alt="Message" />
                        <span>Message</span>
                    </div>
                    <div className="help-option">
                        <img src="/images/computer.png" alt="Laptop" />
                        <span>Technical Help</span>
                    </div>
                    
                </div>
                <img src="/images/image-one.png" alt="Description" className="help-bottom-right-image"/>
                </div>
            </div>
        </div>
    );
}

export default HelpPage;
