import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageOne from '../components/ImageOne';
import './SetupPage.css';
import Background from '../components/Background';

import { collection, setDoc, doc } from 'firebase/firestore';
import { auth, db,onAuthStateChanged} from '../firebase';

const SetupPage = () => {
    const navigate = useNavigate();  

    const [user, setUser] = useState(null); 

    const [profileData, setProfileData] = useState({
      emailAddress: '',
      firstName: '',
      lastName: '',
      password: '',
      nicNumber: '',
      dob: '',
      address: '',
      city: '',
      postalCode: ''
    });  
  
    const [formValid, setFormValid] = useState(true);
    const [errorMessages, setErrorMessages] = useState({});
    const [isChecked, setIsChecked] = useState(false); 
  

    useEffect(() => {
      // Assuming you have a way to retrieve user information after authentication
      // For example, if using Firebase authentication:
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
      });
  
      // Clean up the subscription on unmount or if needed
      return () => unsubscribe();
    }, []);



    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfileData({
        ...profileData,
        [name]: value
      });
   
    setErrorMessages({
      ...errorMessages,
      [name]: ''
    });
  };

    const handleSaveToFirestore = async () => {
      const requiredFields = [
        'emailAddress',
        'firstName',
        'lastName',
        // 'password',
        'nicNumber',
        'dob',
        'address',
        'city',
        'postalCode'
      ];
      let isValid = true;
      const newErrorMessages = {};
  
      requiredFields.forEach((field) => {
        if (!profileData[field]) {
          isValid = false;
          newErrorMessages[field] = 'required *';
        }
      });
  
      if (!isValid) {
        setFormValid(false);
        setErrorMessages(newErrorMessages);
        return;
      }
  



      try {
        const colRef = collection(db, 'profile_data');
        const docRef = doc(colRef, user.uid); // Use user ID as document ID
        await setDoc(docRef, profileData);
        console.log('Data saved to Firestore');
      } catch (error) {
        console.error('Error saving data to Firestore:', error);
      }

      navigate('/packages');
    };

    const handleCheckboxClick = () => {
      setIsChecked(!isChecked);
    };

    return (
      <div className="setup-page">
        <Header/>
        <Background/>
        <div className="main-content">
          <h1 className="page-heading">Set up your profile</h1>
 
          <p className="sub-text">
            Please provide the following information as shown on your passport or ID.
          </p>

          <input 
          type="text" 
          className={`input-box email ${errorMessages.emailAddress && 'error'}`}
          placeholder="Email Address"
          name="emailAddress"
          onChange={handleInputChange}
          required
          />
          {errorMessages.emailAddress && <span className="error-message">required *</span>}
  


          <div className="name-row">
            <input 
            type="text" 
            className={`input-box first-name ${errorMessages.firstName && 'error'}`}
            placeholder="First Name"
            name="firstName"
            onChange={handleInputChange}
            required
            />
            {errorMessages.firstName && <span className="error-message">required *</span>}


            <input 
            type="text" 
            className={`input-box last-name ${errorMessages.lastName && 'error'}`}
            placeholder="Last Name" 
            name="lastName"
            onChange={handleInputChange}
            required
            />
              {errorMessages.lastName && <span className="error-message">required *</span>}
          </div>
          


          <input type="text" 
          className={`input-box nic-number ${errorMessages.nicNumber && 'error'}`}
          placeholder="NIC Number"
          name="nicNumber"
          onChange={handleInputChange}
          required
          />
          {errorMessages.nicNumber && <span className="error-message">required *</span>}

          <input type="text" 
          className={`input-box dob ${errorMessages.dob && 'error'}`}
          placeholder="Date of Birth" 
          name="dob"
          onChange={handleInputChange}
          required
          />
          {errorMessages.dob && <span className="error-message">required *</span>}


          <input 
          type="text" 
          className={`input-box address ${errorMessages.address && 'error'}`}
          placeholder="Address Line" 
          name="address"
          onChange={handleInputChange}
          required
          />
          {errorMessages.address && <span className="error-message">required *</span>}


          <div className="city-postal-row">
            <input 
            type="text" 
            c className={`input-box city ${errorMessages.city && 'error'}`}
            placeholder="City" 
            name="city"
            onChange={handleInputChange}
            required
            />
              {errorMessages.city && <span className="error-message">required *</span>}

            <input 
            type="text" 
            className={`input-box postal-code ${errorMessages.postalCode && 'error'}`}
            placeholder="Postal Code" 
            name="postalCode"
            onChange={handleInputChange}
            required
            />
             {errorMessages.postalCode && <span className="error-message">required *</span>}
          </div>


          {!formValid && <p className="required-error-message">Please fill in all required fields</p>}
          <div className='setup-privacy-statement-text'  onClick={handleCheckboxClick}>
              <div className={`setup-box ${isChecked ? 'checked' : ''}`}></div>
                <p>By clicking the button below, I agree to be bound by 
                  Health Hub’s User Agreement and the Privacy Statement.
                </p>
            </div>
        </div>
      
        <button className='create-account-button' onClick={handleSaveToFirestore} disabled={!isChecked} >Agree and Create Account</button>
        <ImageOne/>
        <Footer/>
      </div>
    );
  };
  

export default SetupPage;