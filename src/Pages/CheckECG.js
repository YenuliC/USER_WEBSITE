import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckValue.css';
import Header from '../components/Header';
import Background from '../components/Background';
import { get, ref } from 'firebase/database';
import { database } from '../firebase';

const   CheckECG = () => {
    
    const [BhrMDHA003, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BhrMDHA003');
    
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
            <div className="check-value-page-container">
                    <h1>Heart-rate</h1>
                        <div className="check-value-textbox">
                            <img src={`/images/testing_complete_tick.png`} alt="Testing Completed Tick" className="check-value-tick-image"/>
                            <h2>Testing Completed</h2>
                            <p className="check-value-info">Your Heart rate is</p>
                            <div className="heart-rate">
                                {BhrMDHA003.length > 0 && BhrMDHA003[0].data !== null ? (
                                    <p className="heart-rate-level">{BhrMDHA003[0].data} bpm </p>
                                ) : (
                                    <p className="heart-rate-level"> Heart-rate Machine is not Conected !!!</p>
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

export default CheckECG;
