import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styled from 'styled-components';

function HeaderBar() {
  const johnWickImage =
    'https://pbs.twimg.com/profile_images/1235695105467707394/I-e9byb2_400x400.png';
  return (
    <Container>
      <InnerContainer>
        <NotificationsNoneOutlinedIcon sx={{ fontSize: '24px' }} />
        <SettingsOutlinedIcon sx={{ fontSize: '24px' }} />
        <ProfileIcon src={johnWickImage} />
        <UserName>John Wick</UserName>
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
`;
const ProfileIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
const UserName = styled.span`
  font-size: 18px;
`;
