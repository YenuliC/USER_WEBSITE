import { useNavigate } from 'react-router-dom';
import './StepsWeight.css';
import Header from '../components/Header';
import Background from '../components/Background';

const StepsWeight= () => {

const navigate = useNavigate();      
const navigateToCheckWeight = () => {
            navigate('/check-weight');  
          };
    return (
        <div className="weight-page">
            <Header />
            <Background/>
            <div className="weight-page-container">
                <div className="weight-heading">
                    <h1>Check Your Weight</h1>
                </div>
                
                <div className="weight-page-content">
                        <div className="weight-steps-textbox">
                            <img src={`/images/weight_image.png`} alt="Steps" className="weight-step-image"/>
                            <div className="weight-step-texts">
                                <p>1 - Place the digital weighing scale on a flat and level surface.</p>
                                <p>2 - Step onto the center of the scale with bare or socked feet. </p>
                                <p>3 - Keep your body still and stand up straight with your arms at your sides.</p>
                                <p>4 - Give the scale a moment to stabilize and calculate your weight.</p>
                            </div>
                        </div> 

                        <video controls className='weight-video'>
                            <source src="/videos/weight.mp4" type="video/mp4"/>
                        </video>
                        <p>Body Weight | How to check your body weight</p>
                        <div className='weight-complete-guidence'>
                        <p>After completing the test, click the finish button.</p>
                        <button className="weight-finish-test-btn" onClick={navigateToCheckWeight}>Finish</button>
                        </div>
                    </div>
                </div>
                </div>
            
    );
}

export default StepsWeight;
