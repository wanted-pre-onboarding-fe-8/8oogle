import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function AdEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasNoState = !location.state;
  React.useEffect(() => {
    if (hasNoState) {
      navigate('/ad');
    }
  }, []);
  return <Container>AdEdit</Container>;
}

export default AdEdit;

const Container = styled.main``;
