import './StepsTemperature.css';
import Header from '../components/Header';
import Background from '../components/Background';
import { useNavigate } from 'react-router-dom';

const StepsTemperature = () => {

    const navigate = useNavigate();      
    const navigateToCheckTemperature = () => {
            navigate('/check-temperature'); 
        }; 

    return (
        <div className="temperature-page">
            <Header />
            <Background/>
        <div className="temperature-page-container">
            <div className="temperature-heading">
                <h1>Test your Temperature</h1>
            </div>
            
            <div className="temperature-page-content">
            <div className="temperature-steps-textbox">
                            <img src={`/images/temperature.png`} alt="Steps" className="temperature-step-image"/>
                            <div className="temperature-step-texts">
                                <p>Please hold the device in front of the forehead.</p>
                            </div>
                        </div>

                    <video controls className='temperature-video'>
                    <source src="/videos/temperature.mp4" type="video/mp4"/>
                    </video>

                    <p>Temperature | How to check your Temperature</p>
                    <div className='temperature-complete-guidence'>
                    <p>After completing the test, click the finish button.</p>
                    <button className="temperature-finish-test-btn" onClick={navigateToCheckTemperature}>Finish</button>
                </div>
                </div>
            </div>    
        </div> 
    );
}

export default StepsTemperature;
