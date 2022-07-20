import React from 'react';
import styled from 'styled-components';

export default function Loader() {
  return <Wrapper>Loading...</Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  font-weight: 600;
`;
