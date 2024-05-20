import { useNavigate } from 'react-router-dom';
import './StepsHeight.css';
import Header from '../components/Header';
import Background from '../components/Background';

const StepsHeight= () => {

const navigate = useNavigate();      
const navigateToCheckHeight = () => {
        navigate('/check-height');  
      };

    return (
        <div className="height-page">
            <Header />
            <Background/>
            <div className="height-page-container">
                <div className="height-heading">
                    <h1>Check Your Height</h1>
                </div>
                
                <div className="height-page-content">
                        <div className="height-steps-textbox">
                            <img src={`/images/height_test.png`} alt="Steps" className="height-step-image"/>
                            <div className="height-step-texts">
                                <p>1 - Take off your shoes and stand on a flat surface with your heels against the wall.</p>
                                <p>2 - Ensure that your heels, shoulders, and the back of your head are all touching the wall.</p>
                                <p>3 - Your body should form a straight line against the wall.</p>
                            </div>
                        </div>
                        
                        <video controls className='height-video'>
                            <source src="/videos/height.mp4" type="video/mp4"/>
                        </video>

                        <p>Height | How to check your Height</p>
                        <div className='height-complete-guidence'>
                        <p>After completing the test, click the finish button.</p>
                        <button className="height-finish-test-btn" onClick={navigateToCheckHeight}>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default StepsHeight;