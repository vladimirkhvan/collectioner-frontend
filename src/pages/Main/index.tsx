import React from 'react'
import { Outlet } from "react-router-dom";
import { Header } from '../../components/Header';

export const Main: React.FC = () => {
  return (
    <div>
        <Header />
        <Outlet/>
    </div>
  )
}
