import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import styled from 'styled-components';

function SideBar() {
  const { pathname } = useLocation();
  return (
    <Container>
      <StyledLink selected={pathname === '/'} to='/'>
        <AssessmentOutlinedIcon />
        대시보드
      </StyledLink>
      <StyledLink selected={pathname === '/ad'} to='/ad'>
        <AddchartOutlinedIcon />
        광고관리
      </StyledLink>
    </Container>
  );
}

export default SideBar;

const Container = styled.nav`
  grid-area: sidebar;
  position: sticky;
  min-width: 200px;
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: ${(props) => (props.selected ? '#7888f4' : '#000')};
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#edeff1' : 'transparent')};
  border-radius: 8px;
  padding: 8px;
`;
