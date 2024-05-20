import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckValue.css';
import Header from '../components/Header';
import Background from '../components/Background';
import { get, ref } from 'firebase/database';
import { database } from '../firebase';


const CheckBloodPressure= () => {

    const [BqeMDHA007, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BqeMDHA007');
    
            try {
                const snapshot = await get(usersRef);
    
                if (snapshot.exists()) {
                    const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray);
                    setUsers(usersArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="check-value-page">
            <Header />
            <Background/>
            <div className='check-value-page-container'>
                <h1>Blood Pressure</h1>
                        <div className="check-value-textbox">
                            <img src={`/images/testing_complete_tick.png`} alt="Tick" className="check-value-tick-image"/>
                            <h2>Testing Completed</h2>
                            <p className="check-value-info">Your Blood Pressure is</p>
                            <div className="Blood-Pressure">
                                {BqeMDHA007.length > 0 && BqeMDHA007[0].data !== null ? (
                                    <p className="Blood-Pressure-level">{BqeMDHA007[0].data} mg/dL</p>
                                ) : (
                                    <p className="Blood-Pressure-level"> Blood-Pressure Machine is not Conected !!!</p>
                                )}
                            </div>
                        </div>
                        <Link to="/home" className="check-value-back-btn">
                            <img src={`/images/back-icon.png`} alt="Back Arrow" className="check-value-back-arrow"/>
                            Back
                        </Link>
                        </div>
                    </div>    
    );
}

export default CheckBloodPressure;