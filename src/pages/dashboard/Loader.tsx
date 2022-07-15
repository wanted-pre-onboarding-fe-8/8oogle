import React from 'react';
import styled from 'styled-components';

export default function Loader() {
  return <Wrapper>Loading...</Wrapper>;
}

const Wrapper = styled.div`
  font-size: 50px;
  font-weight: 600; ;
`;
