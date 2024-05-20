import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageOne from '../components/ImageOne';
import './PaymentCompletion.css';
import Background from '../components/Background';

import { collection, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';


const PaymentCompletion = () => {
    const navigate = useNavigate(); 
    
    const [cardDetails, setCardDetails] = useState({
      cardNumber: '',
      nameOnCard: '',
      expireDate: '',
      securityCode: '',
      // billingAddress: '', // If you want to include billing address, uncomment this line
    });

    const [formValid, setFormValid] = useState(true);
    const [errorMessages, setErrorMessages] = useState({});
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({
          ...cardDetails,
          [name]: value,
        });
      
        setErrorMessages({
          ...errorMessages,
          [name]: '',
        });
      };
    
    
      const handleCheckout = async () => {
        // Assuming you have a way to retrieve user information after authentication
        const user = auth.currentUser;
    
        const requiredFields = ['cardNumber', 'nameOnCard', 'expireDate', 'securityCode'];
        let isValid = true;
        const newErrorMessages = {};
    
        requiredFields.forEach((field) => {
          if (!cardDetails[field]) {
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
          // Save the card details under the user's ID in the 'payment' collection
          const paymentColRef = collection(db, 'payment');
          const paymentDocRef = doc(paymentColRef, user.uid);
          await setDoc(paymentDocRef, cardDetails);
          console.log('Card details saved to Firestore');
        } catch (error) {
          console.error('Error saving card details to Firestore:', error);
        }
      navigate('/home');  
    };
        
    return (
      <div className="payment-page">
            <Header />
            <Background/>
            
        <div className="payment-container">
      
            <h1 className="payment-heading">Payment Completion</h1>
            
            <div className="payment-textbox-container">
            <div className="input-container">
                <input 
                type="text" 
                placeholder="Debit or Credit Card Number" 
                className={`payment-textbox ${errorMessages.cardNumber && 'error'}`} 
                name="cardNumber"
                onChange={handleInputChange}
                required
                />
                 {errorMessages.cardNumber && <span className="payment-error-message">{errorMessages.cardNumber}</span>}
               </div>


               <div className="input-container">
                  <input 
                    type="text" 
                    placeholder="Name on Card" // Updated placeholder
                    className={`payment-textbox ${errorMessages.nameOnCard && 'error'}`} // Updated name
                    name="nameOnCard" // Updated name
                    onChange={handleInputChange}
                    required
                  />
                  {errorMessages.nameOnCard && <span className="payment-error-message">{errorMessages.nameOnCard}</span>} 
                </div>

                <div className="input-container">
                <input 
                type="text" 
                placeholder="Expire Date" 
                className={`payment-textbox ${errorMessages.expireDate && 'error'}`} 
                name="expireDate"
                onChange={handleInputChange}
                required
                />
                  {errorMessages.expireDate && <span className="payment-error-message">{errorMessages.expireDate}</span>}
                </div>


                <div className="input-container">
                <input 
                type="text" 
                placeholder="Security Code" 
                className={`payment-textbox ${errorMessages.securityCode && 'error'}`}
                name="securityCode"
                onChange={handleInputChange}
                required
                />
                
                {errorMessages.securityCode && <span className="payment-error-message">{errorMessages.securityCode}</span>}
                </div>
            </div>
            
            {!formValid && <p className="payment-required-error-message">Please fill in all required fields</p>}
            <button className="checkout-button" onClick={handleCheckout}>Check Out</button>
        </div>
            <ImageOne/>
            <Footer/>
      </div>
    );

    
    
  };
  
export default PaymentCompletion;