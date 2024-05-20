import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageOne from '../components/ImageOne';
import './Branch.css';
import Background from '../components/Background';

const Branch = () => {
const navigate = useNavigate(); 
const [selectedBranch, setSelectedBranch] = useState(''); 

const navigateToSetup= () => {
    if (selectedBranch) {
        navigate('/setup');  
    } else {
        alert('Please select a branch.');
      }
      };

const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
};  

    return (
        <div className="branch-page">
          <Header/>
          <Background/>
          <div className="branch-page-container">
            <h1 className="branch-heading">Branch Name</h1>
   
            <p className="branch-sub-text">
              Please select your branch.
            </p>
  
        <select
          className="branch-input-box"
          value={selectedBranch}
          onChange={handleBranchChange}
          name="branchName"
        >
          <option value="">-Select-</option>
          <option value="Matara">Matara</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
        </select>

            <button className="branch-next-btn" onClick={navigateToSetup}>Next</button>
        </div>
        <ImageOne/>
        <Footer/>
    </div>
  );
};

export default Branch;
