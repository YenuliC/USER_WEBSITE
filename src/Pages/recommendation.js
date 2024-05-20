import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Recommendation.css';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Background from '../components/Background';

const firebaseConfig = {
  apiKey: "AIzaSyAXR0sh_vf6yfRMcz_jBGQnXWIva8uFeg0",
  authDomain: "ecg-signal-data.firebaseapp.com",
  databaseURL: "https://ecg-signal-data-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecg-signal-data",
  storageBucket: "ecg-signal-data.appspot.com",
  messagingSenderId: "341514934731",
  appId: "1:341514934731:web:9ea980f7539aa260543e4e",
  measurementId: "G-927HBPEEWH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

const RecommendationTab = () => {
  const [userData, setUserData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [BheMDHA001, setUsers] = useState([]);
  const [BweMDHA002, setUsers1] = useState([]);
  const [BhrMDHA003, setUsers2] = useState([]);
  const [BteMDHA004, setUsers3] = useState([]);
  const [BreMDHA005, setUsers4] = useState([]);
  const [BfeMDHA006, setUsers5] = useState([]);

  const fetchData = async (path, setStateFunction) => {
    const usersRef = ref(database, path);

    try {
      const snapshot = await onValue(usersRef, (snapshot) => {
        const usersArray = [];
        snapshot.forEach((childSnapshot) => {
          usersArray.push({ id: childSnapshot.key, data: childSnapshot.val() });
        });
        setStateFunction(usersArray);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateBMI = () => {
    if (BweMDHA002.length > 0 && BheMDHA001.length > 0) {
      const weight = BweMDHA002[1].data;
      const height = BheMDHA001[0].data;
    
      // Convert height to meters if it's in centimeters
      const heightInMeters = height > 3 ? height / 100 : height;
    
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      console.log('BMI:', bmi); // Log BMI to the console for debugging
      return isNaN(bmi) ? 'N/A' : bmi;
    }
    return 'N/A';
  };
  const getBMIColor = (bmi) => {
    if (bmi < 18.5) {
      return { color: '#FF5733', label: 'Underweight' };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return { color: '#28A745', label: 'Normal weight' };
    } else {
      return { color: '#FF5733', label: 'Overweight' };
    }
  };
  
  
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const colRef = collection(firestore, 'profile_data');
          const docRef = doc(colRef, user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }

          const realTimeRef = ref(database, user.uid);
          onValue(realTimeRef, (snapshot) => {
            const data = snapshot.val();
            setAdditionalData(data);
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        // Remove the loading state if not used
        // setLoading(false);
      }
    };

    const authStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      }
    });

    return () => {
      authStateChanged(); // Cleanup function to unsubscribe from onAuthStateChanged
    };
  }, []);

  useEffect(() => {
    fetchData('BheMDHA001', setUsers);
    fetchData('BweMDHA002', setUsers1);
    fetchData('BhrMDHA003', setUsers2);
    fetchData('BteMDHA004', setUsers3);
    fetchData('BreMDHA005', setUsers4);
    fetchData('BfeMDHA006', setUsers5);
  }, []);

  useEffect(() => {
    if (userData && additionalData) {
      const weightRecommendation =
        additionalData.weight >= 80
          ? 'Your weight is high. Consider managing your diet and exercising regularly.'
          : 'Your weight is within a healthy range. Keep up the good work!';

      const heartRateRecommendation =
        additionalData.heartRate >= 80 && additionalData.heartRate <= 100
          ? 'Your heart rate is elevated. Ensure you are engaging in regular physical activity.'
          : 'Your heart rate is within a normal range. Keep monitoring for any changes.';

      const temperatureRecommendation =
        additionalData.temperature >= 37.5
          ? 'Your body temperature is high. Monitor for any signs of illness and consult a doctor if needed.'
          : 'Your body temperature is normal.';

      // Remove unused healthRecommendation state
      // setHealthRecommendation(combinedRecommendation);
    }
  }, [userData, additionalData]);

  return (
    <div className="recommendation-page">
        <Header/>
        <Navbar />
        <Background/>
    <div className="container">
  
      <h1>Health Recommendations</h1>

      {userData && (
        <div className="user-details">
          <h3>User Information</h3>
          <p>Name: {userData.firstName} {userData.lastName}</p>
          <p>NIC Number: {userData.nicNumber}</p>
          <p>Date of Birth: {userData.dob}</p>
          
        </div>
      )}

      {userData && additionalData && (
        <div className="overall-health-box">
          <h3>Overall Health</h3>
          <p>{additionalData.temperature >= 37.5 ? 'Your overall health is not optimal. Please monitor for any signs of illness.' : 'Your overall health is good.'}</p>
        </div>
      )}
      <div className="age">
  {userData && (
    <div className="data-card">
      <p className="age-level">Your Age: {calculateAge(userData.dob)} Years </p>
    </div>
  )}
</div>

      {/* New Containers */}
<div className="bmi">
  <div className="data-card">
    <p className="bmi-level">Your BMI Value</p>

    {calculateBMI() !== 'N/A' && (
      <>
        <div className="bmi-meter">
          <div
            className="bmi-progress"
            style={{ width: `${calculateBMI()}%`, backgroundColor: getBMIColor(calculateBMI()).color }}
          >
            <span className="bmi-label">{getBMIColor(calculateBMI()).label}</span>
          </div>
        </div>

        {calculateBMI() >= 18.5 && calculateBMI() <= 24.9 ? (
          <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
        ) : (
          <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
        )}

        <p className="bmi-level">BMI: {calculateBMI()}</p>

        {calculateBMI() >= 18.5 && calculateBMI() <= 24.9 ? (
          <span>Your BMI is within a healthy range.</span>
        ) : (
          <>
            <span>Your BMI is not within a healthy range. Follow these instructions:</span>
            <ul>
                  <li>Consider consulting with a healthcare professional to discuss your BMI and overall health.</li>
                  <li>Evaluate your current diet and consider making healthier food choices.</li>
                  <li>Incorporate regular physical activity into your routine. Aim for at least 150 minutes of moderate-intensity exercise per week.</li>
                  <li>Monitor your weight and BMI regularly to track progress.</li>
                  <li>Avoid crash diets or extreme weight loss methods. Focus on making sustainable lifestyle changes.</li>
                  <li>Stay hydrated and ensure you are getting adequate sleep each night.</li>
                  {/* Add more instructions based on specific health and lifestyle factors */}
                </ul>
              </>
            )}
          </>
        )}
      </div>
      </div>

      

      <div className="temperature">
        {BteMDHA004.length > 0 && (
          <div className="data-card">
            <p className="temperature-level">Temperature: {BteMDHA004[0].data} °C</p>
            {BteMDHA004[0].data >= 37.5 ? (
              <>
                <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
                <span>Your body temperature is high. Monitor for any signs of illness.</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
                <span>Your body temperature is normal.</span>
              </>
            )}
          </div>
        )}
      </div>
      <div className="cholesterol">
  {BreMDHA005.length > 0 && (
    <div className="data-card">
      <p className="cholesterol-level"><b>Cholesterol: {BreMDHA005[0].data} mg/dL</b></p>
      {BreMDHA005[0].data >= 100 ? (
        <>
          <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
          <span>Your cholesterol level is high. Consult a healthcare professional.</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
          <span>Your cholesterol level is within a healthy range.</span>
        </>
      )}
    </div>
  )}
</div>

<div className="diabetes">
  {BfeMDHA006.length > 0 && (
    <div className="data-card">
      <p className="diabetes-level"><b>Blood Sugar Level: {BfeMDHA006[0].data} mg/dL</b></p>
      {BfeMDHA006[0].data >= 120 ? (
        <>
          <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
          <span>Your blood sugar level indicates diabetes. Consult a doctor for further evaluation.</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
          <span>Your blood sugar level is within a normal range. Continue monitoring for any changes.</span>
        </>
      )}
    </div>
  )}
</div>

  


      <div className="heart-rate">
        {BhrMDHA003.length > 0 && (
          <div className="data-card">
            <p className="heart-rate-level">Heart Rate: {BhrMDHA003[0].data} Bpm</p>
            {BhrMDHA003[0].data >= 80 && BhrMDHA003[0].data <= 100 ? (
              <>
                <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
                <span>Your heart rate is elevated. Ensure you are engaging in regular physical activity.</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
                <span>Your heart rate is within a normal range. Keep monitoring for any changes.</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="weight">
        {BweMDHA002.length > 0 && (
          <div className="data-card">
            <p className="weight-level">Weight: {BweMDHA002[1].data} Kg</p>
            {BweMDHA002[1].data >= 80 ? (
              <>
                <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
                <span>Your weight is high. Consider managing your diet and exercising regularly.</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
                <span>Your weight is within a healthy range. Keep up the good work!</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="height">
        {BheMDHA001.length > 0 && (
          <div className="data-card">
            <p className="height-level">Height: {BheMDHA001[0].data} m</p>
            {BheMDHA001[0].data >0 ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
                
              </>
            ) : (
              <>
                
                
              </>
            )}
          </div>
        )}
      </div>

      <div className="overall-health">
        {additionalData && (
          <div className="data-card">
            <p className="overall-health-level">
              Overall Health: {additionalData.temperature >= 37.5 ? 'Not Good' : 'Good'}
            </p>
            {additionalData.temperature >= 37.5 ? (
              <FontAwesomeIcon icon={faExclamationCircle} color="#FF5733" size="lg" />
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} color="#28A745" size="lg" />
            )}
            {additionalData.temperature >= 37.5 ? (
              <span>Your overall health is not optimal. Please monitor for any signs of illness.</span>
            ) : (
              <span>Your overall health is good.</span>
            )}
          </div>
        )}
       <div className="combined-recommendations">
  <h3 style={{ fontWeight: 'bold' }}>Recommendations for Good Health:</h3>
  <p style={{ fontStyle: 'italic' }}>Follow these guidelines to maintain overall well-being and promote good health:</p>

  <ul>
    <li style={{ fontWeight: 'bold' }}>Eat a Balanced Diet:</li>
    <p>Include a variety of whole foods such as fruits, vegetables, whole grains, lean proteins, and healthy fats in your diet. Avoid excessive intake of processed foods, sugary snacks, and high-fat meals.</p>

    <li style={{ fontWeight: 'bold' }}>Stay Hydrated:</li>
    <p>Drink an adequate amount of water throughout the day to support hydration and bodily functions. Limit the consumption of sugary and caffeinated beverages.</p>

    <li style={{ fontWeight: 'bold' }}>Engage in Regular Physical Activity:</li>
    <p>Participate in regular exercise, incorporating both aerobic activities (such as walking or jogging) and strength training. Aim for at least 150 minutes of moderate-intensity exercise per week.</p>

    <li style={{ fontWeight: 'bold' }}>Get Sufficient Sleep:</li>
    <p>Prioritize a consistent sleep schedule and aim for 7-9 hours of quality sleep each night. Quality sleep is essential for overall health and well-being.</p>

    <li style={{ fontWeight: 'bold' }}>Manage Stress:</li>
    <p>Practice stress-reducing activities such as meditation, deep breathing, yoga, or other relaxation techniques. Chronic stress can negatively impact both physical and mental health.</p>

    <li style={{ fontWeight: 'bold' }}>Avoid Smoking and Limit Alcohol Consumption:</li>
    <p>Avoid tobacco products and limit alcohol intake. Both smoking and excessive alcohol consumption can have adverse effects on health.</p>

    <li style={{ fontWeight: 'bold' }}>Regular Health Check-ups:</li>
    <p>Schedule regular check-ups with healthcare professionals for preventive care. This includes screenings, vaccinations, and discussions about your overall health.</p>

    <li style={{ fontWeight: 'bold' }}>Maintain a Healthy Weight:</li>
    <p>Strive to achieve and maintain a healthy weight through a balanced diet and regular physical activity. Consult with healthcare professionals for personalized guidance if needed.</p>
  </ul>
</div>


      </div>
    </div>
    </div>
  );
};

export default RecommendationTab;
