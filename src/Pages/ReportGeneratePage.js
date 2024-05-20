import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import { collection, doc, getDoc } from 'firebase/firestore';
import { onValue, get, ref } from 'firebase/database';
import { auth, db } from '../firebase';
import jsPDF from 'jspdf';
import './ReportGeneratePage.css';
import { database } from '../firebase';

const ReportGeneratePage = () => {
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
    const [reportUrl, setReportUrl] = useState('');

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
        const generateReportUrl = () => {
            // Example: You can use a combination of user ID and timestamp
            const url = 'https://yourwebsite.com/reports/${auth.currentUser.uid}_${Date.now()}';
            setReportUrl(url);
        };

        generateReportUrl();
    }, [userData, additionalData, BheMDHA001, BweMDHA002, BhrMDHA003, BteMDHA004, BreMDHA005, BfeMDHA006, BqeMDHA007]);

    const generatePDF = () => {
        const pdfDoc = new jsPDF();

        // Title
        pdfDoc.setFontSize(20);
        pdfDoc.text('Health Report', 80, 40);

        // Assuming pdfDoc is your jsPDF instance
        var imageUrl = '/images/logo.png';
        var xCoordinate = 10;
        var yCoordinate = 0;
        var newWidth = 40;  // Set the desired width
        var newHeight = 35; // Set the desired height

        pdfDoc.addImage(imageUrl, 'PNG', xCoordinate, yCoordinate, newWidth, newHeight);

        pdfDoc.setFontSize(14);
        BheMDHA001.forEach((user, index) => {
            pdfDoc.text(`Date and Time :-  ${BheMDHA001.length > 0 ? BheMDHA001[1].data : 'N/A'} `, 120, 18 );
        });

        // User Data
        pdfDoc.setFontSize(16);
        pdfDoc.text('~User Details~', 20, 60);
        pdfDoc.setFontSize(14);
        if (userData) {
            pdfDoc.text(`Name: ${userData.firstName} ${userData.lastName}`, 30, 75);
            pdfDoc.text(`NIC Number: ${userData.nicNumber}`, 30, 85);
            pdfDoc.text(`Date of Birth: ${userData.dob}`, 30, 95);
        }

        // Medical Data
        pdfDoc.setFontSize(16);
        pdfDoc.text('~Medical Data~', 20, 115);
        pdfDoc.setFontSize(14);
        // if (additionalData) {
        //     Object.entries(additionalData).forEach(([key, value], index) => {
        //         pdfDoc.text(`${key}: ${value || 'N/A'}`, 20, 100 + index * 10);
        //     });
        // }

        // BheMDHA001 Data
        BheMDHA001.forEach((user, index) => {
            pdfDoc.text(`Height:  ${BheMDHA001.length > 0 ? BheMDHA001[0].data : 'N/A'} m`, 30, 130 );
        });

        // BweMDHA002 Data
        BweMDHA002.forEach((user, index) => {
            pdfDoc.text(`Weight: ${BweMDHA002.length > 0 ? BweMDHA002[1].data : 'N/A'} Kg`, 30, 140 );
        });

        // BhrMDHA003 Data
        BhrMDHA003.forEach((user, index) => {
            // Replace user.data with BheMDHA001[0].data
            pdfDoc.text(`Heart Rate: ${BhrMDHA003.length > 0 ? BhrMDHA003[0].data : 'N/A'} Bpm`, 30, 150 );
        });

        // BteMDHA004 Data
        BteMDHA004.forEach((user, index) => {
            pdfDoc.text(`Temperature:  ${BteMDHA004.length > 0 ? BteMDHA004[0].data : 'N/A'} °C`, 30, 160 );
        });

        // BreMDHA005 Data
        BreMDHA005.forEach((user, index) => {
            pdfDoc.text(`Colestrol:  ${BreMDHA005.length > 0 ? BreMDHA005[0].data : 'N/A'} mg/dL`, 30, 170 );
        });

        // BfeMDHA006 Data
        BfeMDHA006.forEach((user, index) => {
            pdfDoc.text(`Blood Sugar Level:  ${BfeMDHA006.length > 0 ? BfeMDHA006[0].data : 'N/A'} mg/dL`, 30, 180 );
        });

        // BqeMDHA007 Data
        BqeMDHA007.forEach((user, index) => {
            pdfDoc.text(`Blood Pressure:  ${BqeMDHA007.length > 0 ? BqeMDHA007[0].data : 'N/A'} mm Hg`, 30, 190 );
        });

        // Save the PDF
        pdfDoc.save('health_report.pdf');
    };


    const copyUrlToClipboard = () => {
        navigator.clipboard.writeText(reportUrl)
            .then(() => {
                alert('Report URL copied to clipboard!');
            })
            .catch((err) => {
                console.error('Error copying to clipboard:', err);
            });
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

            <div className='report-generate-button-container'>
                <div className="generate-download-section">
                    <p>Get Download PDF to your phone</p>
                    <button onClick={generatePDF} className="generate-download-btn">
                        <span>Click Here</span>
                        <img src="/images/hand-icon.png" alt="Hand Icon" className="generate-hand-icon" />
                    </button>
                </div>

                <div className="generate-copy-section">
                    <p>Copy Report URL</p>
                    <button onClick={copyUrlToClipboard} className="generate-copy-btn">
                        <span>Click Here</span>
                        <img src="/images/hand-icon.png" alt="Hand Icon" className="generate-hand-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportGeneratePage;
