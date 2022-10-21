import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import { Header } from '../../components/Header';

export const Main: React.FC = () => {
    const [username, setUsername] = useState('');
  return (
    <div>
        <Header username={username}/>
        <Outlet context={{setUsername}}/>
    </div>
  )
}
