import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Profile } from './Profile.jsx';
import './App.css';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import { Login } from './Login.jsx';
import { Registration } from './Registration.jsx';
import { AddPet } from './AddPet.jsx';
import { DonationList } from './DonationList.jsx';
import { PetProfile } from './PetProfile.jsx';
import { DonationDetail } from './DonationDetail.jsx';
import { OtpVerify } from './OtpVerify.jsx';

import { DonationPayment } from './DonationPayment.jsx';

export default function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login data={data} setData={setData} />} />
          <Route path="/register" element={<Registration data={data} setData={setData} />} />
          <Route path="/profile" element={<Profile data={data} setData={setData} />} />
          <Route path="/addpet" element={<AddPet data={data} setData={setData} />} />
          <Route path="/donation" element={<DonationList data={data} setData={setData} />} />
          <Route path="/petprofile" element={<PetProfile data={data} setData={setData} />} />
          <Route path="/donationdetails" element={<DonationDetail data={data} setData={setData} />} />
          <Route path="/otp_verification" element={<OtpVerify data={data} setData={setData} />} />    
          <Route path="/donationpayment" element={<DonationPayment data={data} setData={setData} />} />            
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
      {/* <Login /> */}
    </div>
  )
}
