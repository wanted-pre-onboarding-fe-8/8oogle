import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import SideBar from '../components/SideBar';
import styled from 'styled-components';

function DefaultLayout() {
  return (
    <Container>
      <SideBar />
      <HeaderBar />
      <Outlet />
    </Container>
  );
}

export default DefaultLayout;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  grid-template-areas:
    'sidebar header'
    'sidebar outlet';
`;
