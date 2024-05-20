import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StepsBloodPressure.css';
import Header from '../components/Header';
import Background from '../components/Background';

const StepsBloodPressure = () => {
    
const navigate = useNavigate();      
const navigateToCheckBloodPressure = () => {
        navigate('/check-blood');  
      };
    return (
        <div className="bp-page">
            <Header />
            <Background/>
            <div className="bp-page-container">
                <div className="bp-heading">
                    <h1>Test Your Blood Pressure</h1>
                </div>
                
                <div className="bp-page-content">
                        <div className="bp-steps-textbox">
                            <img src={`/images/blood_pressure_step.png`} alt="Steps" className="bp-step-image"/>
                            <div className="bp-step-texts">
                                <p>1 - Rest for 5 minutes before measuring your blood pressure.</p>
                                <p>2 - Sit in a chair with both feet flat on the ground and back straight.</p>
                                <p>3 - Place your arm at the level of your heart or chest.</p>
                                <p>4 - Stay still and do not talk as your blood pressure machine operates.</p>
                            </div>
                        </div>
                        <video controls className='bp-video'>
                            <source src="/videos/height.mp4" type="video/mp4"/>
                        </video>
                        <h2>Measure Blood Pressure | How to Use a Blood Pressure Monitor</h2>

                        <div className='bp-complete-guidence'>
                        <p>After completing the test, click the finish button.</p>
                        <button className="bp-finish-test-btn" onClick={navigateToCheckBloodPressure}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default StepsBloodPressure;
