import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StepsCholesterol.css';
import Header from '../components/Header';
import Background from '../components/Background';

const StepsCholesterol = () => {
    const navigate = useNavigate();      
const navigateToCheckcholesterol = () => {
        navigate('/check-cholesterol');  
      };
    return (
        <div className="cholesterol-page">
            <Header />
            <Background/>
            <div className="cholesterol-container">
                <div className="cholesterol-heading">
                    <h1>Test Your Cholesterol Level </h1>
                </div>
                
                <div className="cholesterol-content">
                        <div className="cholesterol-steps-textbox">
                            <img src={`/images/Cholesterol-Test.png`} alt="Steps" className="cholesterol-step-image"/>
                            <div className="cholesterol-step-texts">
                                <p>1 - Prick your finger with the lancet provided to draw a drop of blood.</p>
                                <p>2 - Place the blood on a test strip.</p>
                                <p>3 -  Insert the test strip into the meter provided to measure cholesterol levels.</p>
                                <p>4 - Stay still and do not talk as yor blood pressure machine operates.</p>
                            </div>
                        </div>
                        <video controls className='cholesterol-video'>
                            <source src="/videos/height.mp4" type="video/mp4"/>
                        </video>
                        <h2>Test cholesterol level | How to check you Blood cholesterol level</h2>
                        <div className='cholesterol-complete-guidence'>
                        <p>After completing the test, click the finish button.</p>
                        <button className="cholesterol-finish-test-btn" onClick={navigateToCheckcholesterol}>Finish</button>
                        </div>
                    </div>

                    
                    </div>
                </div>
    );
}

export default StepsCholesterol;
