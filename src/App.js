import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import Signup from './Pages/Signup';
import Setup from './Pages/SetupPage'
import './App.css';
import LoginPage from './Pages/LoginPage';
import Branch from './Pages/Branch';
import PackageSelection from './Pages/PackageSelection';
import PaymentCompletion from './Pages/PaymentCompletion';
import HomePage from './Pages/HomePage';
import StepsTemperature from './Pages/StepsTemperature'; 
import StepsHeartRate from './Pages/StepsHeartRate';
import StepsWeight from './Pages/StepsWeight';
import StepsHeight from './Pages/StepsHeight';
import StepsGlucose from './Pages/StepsGlucose';
import StepsBloodPressure from './Pages/StepsBloodPressure';
import StepsCholesterol from './Pages/StepsCholesterol';

import QRscanPage from './Pages/QRscanPage';
import HelpPage from './Pages/HelpPage';
import DisplayPage from './Pages/DisplayPage';
import ReportGeneratePage from './Pages/ReportGeneratePage';
import ReportSharePage from './Pages/ReportSharePage';
import CheckHeight from './Pages/CheckHeight';
import CheckTemperature from './Pages/CheckTemperature';
import CheckWeight from './Pages/CheckWeight';
import CheckECG from './Pages/CheckECG';
import CheckGlucose from './Pages/CheckGlucose';
import CheckBloodPressure from './Pages/CheckBloodPressure';
import CheckCholesterol from './Pages/CheckCholesterol';

import RecommendationTab from './Pages/recommendation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<WelcomePage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/branch" element={<Branch/>}/>
        <Route path="/setup" element={<Setup/>}/>
        <Route path="/packages" element={<PackageSelection/>}/>
        <Route path="/payment" element={<PaymentCompletion/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/temperature" element={<StepsTemperature/>} />
        <Route path="/heart-rate" element={<StepsHeartRate/>} />
        <Route path="/weight" element={<StepsWeight/>} />
        <Route path="/height" element={<StepsHeight/>} />
        <Route path='/glucose' element={<StepsGlucose/>} />
        <Route path='/blood-pressure' element={<StepsBloodPressure/>} />
        <Route path='/cholesterol' element={<StepsCholesterol/>} />


        <Route path="/qrscanpage" element={<QRscanPage/>} />
        <Route path="/help" element={<HelpPage/>} />
        <Route path="/dashboard" element={<DisplayPage/>} />
      

        <Route path="/report-generate" element={<ReportGeneratePage/>} />
        <Route path='/report-share' element={<ReportSharePage/>} />
        <Route path='/check-height' element={<CheckHeight/>} />
        <Route path='/check-temperature' element={<CheckTemperature/>} />
        <Route path='/check-weight' element={<CheckWeight/>} />
        <Route path='/check-ecg' element={<CheckECG/>} />
        <Route path='/check-glucose' element={<CheckGlucose/>} />
        <Route path='/check-blood' element={<CheckBloodPressure/>} />
        <Route path='/check-cholesterol' element={<CheckCholesterol/>} />

        <Route path='/recommendation' element={<RecommendationTab/>} />
      </Routes>
    </Router>
  );
}

export default App;
