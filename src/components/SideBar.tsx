import React from 'react';
import { Link } from 'react-router-dom';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import styled from 'styled-components';

function SideBar() {
  return (
    <Container>
      <StyledLink to='/'>
        <AssessmentOutlinedIcon />
        대시보드
      </StyledLink>
      <StyledLink to='/ad'>
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
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: #000;
  cursor: pointer;
`;
