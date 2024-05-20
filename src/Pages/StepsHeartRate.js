import { useNavigate } from 'react-router-dom';
import './StepsHeartRate.css';
import Header from '../components/Header';
import Background from '../components/Background';

const StepsHeartRate = () => {
    
const navigate = useNavigate();      
const navigateToCheckECG = () => {
        navigate('/check-ecg');  
      };
    return (
        <div className="heart-rate-page">
            <Header />
            <Background/>
            <div className="heart-rate-page-container">
                <div className="heart-rate-heading">
                    <h1>Test Your Heart Rate </h1>
                </div>
                
                <div className="heart-rate-page-content">
                    <div className="heart-rate-page-left-section">
                        <div className="heart-rate-steps-textbox">
                            <img src={`/images/heart-rate-image.png`} alt="Steps" className="heart-rate-step-image"/>
                            <div className="heart-rate-step-texts">
                                <p>1 - Rest for 5 minutes before measuring your blood pressure.</p>
                                <p>2 - Sit in a chair.</p>
                                <p>3 - Connect the 3 electrodes chest or limb to detect heart rate.</p>
                                <p>4 - Stay still and do not talk as your blood pressure machine operates.</p>
                            </div>
                        </div>
                        <video controls className='ecg-video'>
                            <source src="/videos/ecg.mp4" type="video/mp4"/>
                        </video>
                        <h2>ECG  Test | How to check you Heart Rate</h2>
                        <div className='ecg-complete-guidence'>
                        <p>After completing the test, click the finish button.</p>
                        <button className="ecg-finish-test-btn" onClick={navigateToCheckECG}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        // </div> 
    );
}

export default StepsHeartRate;
