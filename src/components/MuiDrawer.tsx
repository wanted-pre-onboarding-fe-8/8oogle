import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Box } from '@mui/material';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import styled from 'styled-components';

interface MuiDrawerProps {
  isOpen: boolean;
  handleClose: (flag: boolean) => void;
  width: number;
}

function MuiDrawer({ isOpen, handleClose, width }: MuiDrawerProps) {
  return (
    <Drawer anchor='left' open={isOpen} onClose={() => handleClose(false)}>
      <Container width={width}>
        <StyledLink to='/' onClick={() => handleClose(false)}>
          <AssessmentOutlinedIcon />
          대시보드
        </StyledLink>
        <StyledLink to='/ad' onClick={() => handleClose(false)}>
          <AddchartOutlinedIcon />
          광고관리
        </StyledLink>
      </Container>
    </Drawer>
  );
}

export default MuiDrawer;

const Container = styled(Box)((width) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  paddingTop: '48px',
  width: `${width}px`,
}));

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: #000;
  cursor: pointer;
`;
