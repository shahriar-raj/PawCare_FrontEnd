import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import { people } from './cats.jsx'
import { Login } from './Login.jsx';

export default function App() {
  const listItems = people.map(person => <li>{person.name} {person.age}</li>);
  return (
    <div className="App">
      <Login />
    </div>
  )
}
