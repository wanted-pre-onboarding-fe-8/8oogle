import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import MuiDrawer from '../components/MuiDrawer';

function DefaultLayout() {
  const DRAWER_WIDTH = 250;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container>
      <MuiDrawer isOpen={isOpen} handleClose={setIsOpen} width={DRAWER_WIDTH} />
      <SideBar />
      <HeaderBar handleOpen={setIsOpen} />
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
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'outlet';
  }
`;
