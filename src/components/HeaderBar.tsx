import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styled from 'styled-components';

interface HeaderBarProps {
  handleOpen: (flag: boolean) => void;
}

function HeaderBar({ handleOpen }: HeaderBarProps) {
  const johnWickImage =
    'https://pbs.twimg.com/profile_images/1235695105467707394/I-e9byb2_400x400.png';
  return (
    <Container>
      <InnerContainer>
        <IconButton onClick={() => handleOpen(true)}>
          <MenuIcon sx={{ fontSize: '24px' }} />
        </IconButton>
        <ProfileAndControls>
          <NotificationsNoneOutlinedIcon sx={{ fontSize: '24px' }} />
          <SettingsOutlinedIcon sx={{ fontSize: '24px' }} />
          <ProfileIcon src={johnWickImage} />
          <UserName>John Wick</UserName>
        </ProfileAndControls>
      </InnerContainer>
    </Container>
  );
}

export default HeaderBar;

const Container = styled.header`
  grid-area: header;
  width: 100%;
`;
const InnerContainer = styled.nav`
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px 0;
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    justify-content: space-between;
    padding: 4px 16px;
  }
`;
const ProfileAndControls = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ProfileIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const UserName = styled.span`
  font-size: 18px;
`;
