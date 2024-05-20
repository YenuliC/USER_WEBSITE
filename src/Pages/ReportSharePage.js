import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import { collection, doc, getDoc } from 'firebase/firestore';
import { onValue, get, ref } from 'firebase/database';
import { auth, db } from '../firebase';
import './ReportSharePage.css';
import { database } from '../firebase';

const ReportSharePage = () => {
    const [userData, setUserData] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);
    const [BheMDHA001, setUsers] = useState([]);
    const [BweMDHA002, setUsers1] = useState([]);
    const [BhrMDHA003, setUsers2] = useState([]);
    const [BteMDHA004, setUsers3] = useState([]);
    const [BreMDHA005, setUsers4] = useState([]);
    const [BfeMDHA006, setUsers5] = useState([]);
    const [BqeMDHA007, setUsers6] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportLink, setReportLink] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                
                if (user) {
                    const colRef = collection(db, 'profile_data');
                    const docRef = doc(colRef, user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log('No such document!');
                    }

                    const realTimeRef = ref(db, user.uid);
                    onValue(realTimeRef, (snapshot) => {
                        const data = snapshot.val();
                        console.log('Real-time Data:', data);
                        setAdditionalData(data);
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchData = async (path, setStateFunction) => {
            const usersRef = ref(database, path);

            try {
                const snapshot = await get(usersRef);

                if (snapshot.exists()) {
                    const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray);
                    setStateFunction(usersArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData('BheMDHA001', setUsers);
        fetchData('BweMDHA002', setUsers1);
        fetchData('BhrMDHA003', setUsers2);
        fetchData('BteMDHA004', setUsers3);
        fetchData('BreMDHA005', setUsers4);
        fetchData('BfeMDHA006', setUsers5);
        fetchData('BqeMDHA007', setUsers6);
    }, []);

    useEffect(() => {
        // Generate a unique link based on user data or other relevant information
        const generateReportLink = () => {
            // Example: You can use a combination of user ID and timestamp
            const link = "https://yourwebsite.com/reports/${auth.currentUser.uid}_${Date.now()}";
            setReportLink(link);
        };

        generateReportLink();
    }, [userData, additionalData, BheMDHA001, BweMDHA002, BhrMDHA003, BteMDHA004, BreMDHA005, BfeMDHA006, BqeMDHA007]);

    const shareReport = () => {
        // Use the generated report link for sharing
        window.open("https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reportLink)}, '_blank'");
    };

    return (
        <div className="report-generate-page">
            <Header />
            <Background />
            <Navbar />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="report-generate-box">
                    <div className="report-generate-box-heading">
                        Health Report
                    </div>
                    <div className="report-generate-box-content">
                        {userData && (
                            <>
                                <p>User Details</p>
                                <p>Name: {userData.firstName} {userData.lastName}</p>
                                <p>NIC Number: {userData.nicNumber}</p>
                                <p>Date of Birth: {userData.dob}</p>
                                <p>Medical Data</p>
                            </>
                        )}
                        {additionalData && (
                            <>
                                {/* Display all health data */}
                                {Object.entries(additionalData).map(([key, value]) => (
                                    <p key={key}>{`${key}: ${value || 'N/A'}`}</p>
                                ))}
                            </>
                        )}
                        <div className="Blood Pressure">
                            {BqeMDHA007.length > 0 && (
                                <p className="Blood Pressure-level">Blood Pressure: {BqeMDHA007[0].data} mm Hg</p>
                        )}
                        </div>
                        <div className="Blood Sugar">
                            {BfeMDHA006.length > 0 && (
                                <p className="Blood Sugarl-level">Blood Sugar Level: {BfeMDHA006[0].data} mg/dL</p>
                        )}
                        </div>
                        <div className="Colestrol">
                            {BreMDHA005.length > 0 && (
                                <p className="Colestrol-level">Colestrol: {BreMDHA005[0].data} mg/dL</p>
                        )}
                        </div>
                        <div className="temperature">
                            {BteMDHA004.length > 0 && (
                                <p className="temperature-level">Temperature: {BteMDHA004[0].data} °C</p>
                        )}
                        </div>
                        <div className="heart-rate">
                            {BhrMDHA003.length > 0 && (
                                <p className="heart-rate-level">Heart rate: {BhrMDHA003[0].data} Bpm</p>
                            )}
                        </div>
                        <div className="weight">
                                {BweMDHA002.length > 0 && (
                                    <p className="weight-level">Weight: {BweMDHA002[1].data} Kg</p>
                                )}
                            </div>
                        <div className="height">
                                {BheMDHA001.length > 0 && (
                                    <p className="height-level">Height: {BheMDHA001[0].data} cm</p>
                                )}
                        </div>
                    </div>
                </div>
            )}
            
            <button className="report-share-btn" onClick={shareReport}>
                <img src="/images/share-icon.png" alt="Hand Icon" className="report-share-icon" />
                Share
            </button>
        </div>
    );
}

export default ReportSharePage;