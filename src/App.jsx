import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import { Login } from './Login.jsx';

export default function App() {
  return (
    <div className="App">
      <Login />
    </div>
  )
}
