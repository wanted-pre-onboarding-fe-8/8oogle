import React from 'react';
import styled from 'styled-components';
import { getDashboard } from '../../queries/queryRequest';
import PlatformChart from './PlatformChart';

interface iWrapper {
  startDate: string;
  endDate: string;
}

function Wrapper({ startDate, endDate }: iWrapper) {
  const [{ data: overall }, { data: platform }] = getDashboard(startDate, endDate);

  return (
    <Box>
      <PlatformChart platforms={platform} />
    </Box>
  );
}

export default Wrapper;

const Box = styled.div`
  width: 80%;
`;
