import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import SideBar from '../components/SideBar';

function DefaultLayout() {
  return (
    <>
      <HeaderBar />
      <SideBar />
      <Outlet />
    </>
  );
}

export default DefaultLayout;
