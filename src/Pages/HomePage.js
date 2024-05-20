import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Background from '../components/Background';


const TextBox = ({title, text1, text2, background, titleColor, textColor, width, height,imageSrc}) => (
    <div className="home-textbox" style={{ background, width, height }}>
         <img src={imageSrc} alt={title} className="home-textbox-image" />
       
        <div>
            <h2 style={{ color: titleColor }}>{title}</h2>
            <p style={{ color: textColor }}>{text1}</p>
            <p style={{ color: textColor }}>{text2}</p>
        </div>
    </div>
);

const HomePage = () => {
    return (
        <div className="home-page">
        <Header/>
        <Background/>
        <Navbar />
            <div className="home-content">
                <div className="home-first-column">
                    <Link to="/height">
                        <TextBox 
                            title="Check Your Height" 
                            text1="Click the icon" 
                            text2="and start to test"
                            background="#E3B7F8"
                            titleColor="#740A8F"
                            textColor="#333BE9"
                            imageSrc={`/images/height.png`}
                        />
                    </Link>

                    <Link to="/temperature">
                        <TextBox 
                            title="Temperature Test" 
                            text1="Check Your Temperature" 
                            text2="Click the icon and start to test"
                            background="#9DDAE3"
                            titleColor="#740A8F"
                            textColor= "#4d4a4a"
                            imageSrc={`/images/thermometer.png`}
                        />
                    </Link>


                    
                </div>
                <div className="home-second-column">
                  
                <Link to="/weight">
                        <TextBox 
                            title="Check Your Body Weight" 
                            text1="Check Your Body Weight" 
                            text2="We calculate Your BMI Value"
                            background="#FDFDFF"
                            titleColor="#4C62B0"
                            textColor="#4C62B0"
                            imageSrc={`/images/weight.png`}
                        />
                    </Link>
                
                    <Link to="/blood-pressure">
                        <TextBox 
                            title="Blood Pressure Test" 
                            text1="Test Your Blood Pressure" 
                            text2="Click the icon and start to test"
                            background="#9DACE3"
                            titleColor="#1E55E5"
                            textColor="#1E55E5"
                            imageSrc={`/images/Blood-Pressure-Monitor.png`}
                        />
                    </Link>
                    
                </div>
                <div className="home-third-column">
               

                <Link to="/heart-rate">
                        <TextBox 
                            title="ECG Test" 
                            text1="Electrical signals in the heart" 
                            text2="Click the icon and start to test"
                            background="#F095FF"
                            titleColor="#1E55E5"
                            textColor="#1E55E5"
                            imageSrc={`/images/heart-rate.png`}

                        />
                        
                    </Link>


                    <Link to="/glucose">
                        <TextBox 
                            title="Glucose Test" 
                            text1="Test Your Glucose Level" 
                            text2="Click the icon and start to test"
                            background="#9DDAE3"
                            titleColor="#1E55E5"
                            textColor="#1E55E5"
                            imageSrc={`/images/Glucose_Monitor.png`}
                        />
                    </Link>
                    </div>

                    <div className="home-fourth-column">
                    <Link to="/Cholesterol">
                        <TextBox 
                            title="Cholesterol Test" 
                            text1="Check Your Cholesterol level" 
                            text2="Click the icon and start to test"
                            background="#CEDAF9"
                            titleColor="#1E55E5"
                            textColor="#1E55E5"
                            imageSrc={`/images/cholesterol.png`}

                        />
                    </Link>
                  
                    </div>
            </div>
            </div>
    );
}

export default HomePage;

