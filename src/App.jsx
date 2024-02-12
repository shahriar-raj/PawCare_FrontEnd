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
import { ShowImage } from './ShowImage.jsx';
import { DonationPayment } from './DonationPayment.jsx';
import { AddpetPhoto } from './AddpetPhoto.jsx';
import { DonationApply } from './DonationApply.jsx';
import { Admin } from './Admin.jsx';
import { Forum } from './Forum.jsx';
import { PaymentSuccess } from './PaymentSuccess.jsx';
import { AdoptionList } from './AdoptionList.jsx';
import { Users } from './Users.jsx';
import { Notification } from './Notification.jsx';
import { Adopt } from './Adopt.jsx';
import { About } from './About.jsx';

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
          <Route path="/showimage" element={<ShowImage data={data} setData={setData} />} />   
          <Route path="/petPhoto" element={<AddpetPhoto data={data} setData={setData} />} />    
          <Route path="/donationapply" element={<DonationApply data={data} setData={setData} />} />   
          <Route path="/admin" element={<Admin data={data} setData={setData} />} />
          <Route path="/forum" element={<Forum data={data} setData={setData} />} />
          <Route path="/donation/donationSuccess/:tran_id" element={<PaymentSuccess/>} />
          <Route path="/adoption" element={<AdoptionList data={data} setData={setData} />} />
          <Route path="/users" element={<Users data={data} setData={setData} />} />
          <Route path="/notifications" element={<Notification data={data} setData={setData} />} />
          <Route path="/adopt" element={<Adopt data={data} setData={setData} />} />
          <Route path="/about" element={<About data={data} setData={setData} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
      {/* <Login /> */}
    </div>
  )
}
