import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import './DisplayPage.css';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { get, ref } from 'firebase/database';
import { database } from '../firebase';

const DisplayPage = () => {
    const [userData, setUserData] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const fetchAndSaveData = async (deviceID, fieldName, stateSetter) => {
        const usersRef = ref(database, deviceID);
    
        try {
            const snapshot = await get(usersRef);
    
            if (snapshot.exists()) {
                const data = snapshot.val();
    
                // Save the data into Firestore under the user's document
                const user = auth.currentUser;
                const medicalDocRef = doc(db, 'medicalData', user.uid);
                
                // Extract the value from the time-value pair
                const value = data[Object.keys(data)[0]];
    
                // Save only the value in Firestore
                const updateData = { [fieldName]: value }; // Use fieldName as a dynamic key
                await setDoc(medicalDocRef, updateData, { merge: true });
    
                console.log(`Fetched and saved ${fieldName} data in Firestore`);
    
                // Update the state variable
                stateSetter(value);
            } else {
                console.log(`No data available for ${deviceID}`);
            }
        } catch (error) {
            console.error(`Error fetching data for ${deviceID}:`, error);
        }
    };
    
      useEffect(() => {
        const migrateMedicalData = async () => {
          try {
            const user = auth.currentUser;
    
            if (user) {
              // Fetch and save medical data for each device
              await fetchAndSaveData('BheMDHA001', 'height', setUsers);
              await fetchAndSaveData('BweMDHA002', 'weight', setUsers1);
              await fetchAndSaveData('BhrMDHA003', 'heartRate', setUsers2);
              await fetchAndSaveData('BteMDHA004', 'temperature', setUsers3);
              await fetchAndSaveData('BreMDHA005', 'cholesterol', setUsers4);
              await fetchAndSaveData('BfeMDHA006', 'glucose', setUsers5);
              await fetchAndSaveData('BqeMDHA007', 'bloodPressure', setUsers6);
    
              console.log('Medical data migrated successfully!');
            } else {
              console.log('User not authenticated');
            }
          } catch (error) {
            console.error('Error migrating medical data:', error);
          }
        };
    
        migrateMedicalData();
      }, []);



    useEffect(() => {
        const fetchUserData = async () => {
        try {
        const user = auth.currentUser;
            if (user) {
             // Fetch user data from 'profile_data'
            const colRef = collection(db, 'profile_data');
            const docRef = doc(colRef, user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log('No such document!');
            }
            // Fetch selected package from 'package' collection
            const packageDocRef = doc(db, 'package', user.uid);
            const packageDocSnap = await getDoc(packageDocRef);

            if (packageDocSnap.exists()) {
                setSelectedPackage(packageDocSnap.data().packageType);
            }
        }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
    }, []);


    const [BheMDHA001, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BheMDHA001');
    
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

    const [BweMDHA002, setUsers1] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BweMDHA002');
    
            try {
                const snapshot = await get(usersRef);
    
                if (snapshot.exists()) {
                    const usersArray1 = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray1);
                    setUsers1(usersArray1);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [BhrMDHA003, setUsers2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BhrMDHA003');
    
            try {
                const snapshot = await get(usersRef);
    
                if (snapshot.exists()) {
                    const usersArray2 = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray2);
                    setUsers2(usersArray2);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [BteMDHA004, setUsers3] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BteMDHA004');
    
            try {
                const snapshot = await get(usersRef);
    
                if (snapshot.exists()) {
                    const usersArray3 = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray3);
                    setUsers3(usersArray3);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [BreMDHA005, setUsers4] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BreMDHA005');
    
            try {
                const snapshot = await get(usersRef);
    
                if (snapshot.exists()) {
                    const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray);
                    setUsers4(usersArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [BfeMDHA006, setUsers5] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = ref(database, 'BfeMDHA006');
    
            try {
                const snapshot = await get(usersRef);
    
                if (snapshot.exists()) {
                    const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        data,
                    }));
                    console.log('Fetched data:', usersArray);
                    setUsers5(usersArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const [BqeMDHA007, setUsers6] = useState([]);

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
                    setUsers6(usersArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="display-page">
            <Header />
            <Background/>
            <Navbar />

            <div className="display-main-content">
            {auth.currentUser && userData && selectedPackage &&(
                <div className="display-left-section">
                    <div className="display-textbox profile">
                        <div className='display-profile-row'>
                        <img src="/images/profile.png" alt="Profile" className='display-image-profile'/>
                        <h2>Profile</h2>
                        </div>
                        <p>Name: {userData.firstName} {userData.lastName}</p>
                        <p>NIC Number: {userData.nicNumber}</p>
                        <p>Date of Birth: {userData.dob}</p>
                        <p>Address: {userData.address}</p>
                        <p>City: {userData.city}</p>
                        {/* <p>Phone Number: {userData.phoneNumber}</p> */}
                        <p>Email: {userData.emailAddress}</p>
                    </div>
                    <div className="display-textbox work">
                        <h2>Today's Work</h2>
                        <p>{selectedPackage} Plan activated</p>
                        {/* Assuming you want to display the price as well */}
                        {selectedPackage === 'Premium' && <p>$5.99</p>}
                        {selectedPackage === 'Basic' && <p>$3.99</p>}
                        <hr />
                        <p>Completed Payment</p>
                    </div>
                </div>
            )}
                <div className="display-right-section">
                    
                    <div className='display-first-row'>
                    <div className="display-textbox heart-rate">
                        <img src="/images/heart-rate.png" alt="Heart Rate" className='display-image-heart-rate' />
                        <div className="heart-rate">
                            {BhrMDHA003.length > 0 && (
                                <p className="heart-rate-level">{BhrMDHA003[0].data} bpm </p>
                            )}
                         <h3>Heart Rate</h3>
                        </div>  
                        
                    </div>

                    <div className="display-textbox temperature">
                        <img src="/images/thermometer.png" alt="Glucose Level" className='display-image-temperature' />
                        <div>
                        <div className="temperature">
                            {BteMDHA004.length > 0 && (
                                <p className="temperature-level">{BteMDHA004[0].data} °C</p>
                            )}
                             <h3>Temperature</h3>
                        </div>                 
                        </div>
                    </div>
                    </div>

                    <div className='display-second-row'>
                    <div className="display-textbox blood">
                        <img src="/images/blood-pressure.png" alt="Weight" className='display-image-blood'/>
                        <div className="blood">
                                {BqeMDHA007.length > 0 && (
                                    <p className="blood-level">{BqeMDHA007[0].data} mm Hg</p>
                                )}
                                <h3>Blood Pressure</h3>
                        </div>
                       
                    </div>
                    <div className="display-textbox glucose">
                        <img src="/images/glucose-level.png" alt="Weight" className='display-image-glucose'/>
                        <div className="glucose">
                                {BfeMDHA006.length > 0 && (
                                    <p className="glucose-level">{BfeMDHA006[0].data} mg/dL</p>
                                )}
                                <h3>Glucose Level</h3>
                        </div>
                        
                    </div>
                    </div>
                    </div>

                    <div className='display-third-row'>
        
                    <div className="display-textbox weight">
                        <img src="/images/Weight1.png" alt="Weight" className='display-image-weight'/>
                        <div>
                        <div className="weight">
                                {BweMDHA002.length > 0 && (
                                    <p className="weight-level">{BweMDHA002[1].data} Kg</p>
                                )}
                                  <h3>Weight</h3>
                        </div>
                      
                        </div>
                    </div>
                    <div className="display-textbox height">
                        <img src="/images/height.png" alt="Weight" className='display-image-height'/>
                        <div>
                        <div className="height">
                                {BheMDHA001.length > 0 && (
                                    <p className="height-level">{BheMDHA001[0].data} cm</p>
                                )}
                                  <h3>Height</h3>
                        </div>
                      
                    </div>
                    </div>
                </div>
                <div className='display-fourth-row'>
                <div className="display-textbox cholesterol">
                        <img src="/images/cholesterol.png" alt="cholesterol" className='display-image-cholesterol'/>
                        <div className="cholesterol">
                                {BreMDHA005.length > 0 && (
                                    <p className="cholesterol-level">{BreMDHA005[0].data} mg/dL</p>
                                )}
                                 <h3>Cholesterol</h3>
                        </div>
                       
                    </div>
                    </div>
            </div>
            </div>
    
    );
}

export default DisplayPage;