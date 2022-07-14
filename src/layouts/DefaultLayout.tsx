import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import SideBar from './SideBar';

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
