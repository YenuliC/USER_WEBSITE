import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StepsGlucose.css';
import Header from '../components/Header';
import Background from '../components/Background';

const CheckGlucose = () => {

    
const navigate = useNavigate();      
const navigateToCheckGlucose = () => {
        navigate('/check-glucose');  
      };
    return (
        <div className="glucose-page">
            <Header />
            <Background/>
        <div className="glucose-page-container">
            <div className="glucose-heading-bg">
                <h1>Test your glucose level</h1>
            </div>
            
            <div className="glucose-page-content">
               <div className="glucose-steps-textbox">     
                    <img src={`/images/glucose_test_step.png`} alt="First" className="glucose-test-first-image"/>
                </div>
       

            <video controls className='glucose-video'>
                <source src="/videos/height.mp4" type="video/mp4"/>
            </video>
             <p>Glucose Level | How to check your Glucose Level</p>
                <div className='glucose-complete-guidence'>
                    <p>After completing the test, click the finish button.</p>
                    <button className="glucose-finish-test-btn" onClick={navigateToCheckGlucose}>Finish</button>
                </div>
        </div>
    </div>    
    </div>
    );
}

export default CheckGlucose;
