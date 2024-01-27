import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './About.jsx';
import './App.css';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import { Login } from './Login.jsx';

export default function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login data={data} setData={setData} />} />
          <Route path="/about" element={<About data={data} setData={setData} />} />
        </Routes>
      </Router>
      {/* <Login /> */}
    </div>
  )
}
