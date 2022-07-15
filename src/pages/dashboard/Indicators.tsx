import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { experimentalStyled } from '@mui/material/styles';
import styled from 'styled-components';

import { IOverallItem } from '../../types/overall';
import lodash from 'lodash';

export default function Indicators({
  roasList,
  costList,
  impList,
  clickList,
  cvrList,
  convValue,
}: any): JSX.Element {
  const sumRoasList = lodash.sum(roasList);
  const sumCostList = lodash.sum(costList);
  const sumImpList = lodash.sum(impList);
  const sumClickList = lodash.sum(clickList);
  const sumCvrList = lodash.sum(cvrList);
  const sumConvValue = lodash.sum(convValue);

  const [roas, setRoas] = useState<any>([]);
  const [cost, setCost] = useState<any>([]);
  const [click, setClick] = useState<any>([]);
  const [cvr, setCvr] = useState<any>([]);
  const [ctr, setCtr] = useState<any>([]);
  const [cpc, setCvc] = useState<any>([]);

  useEffect(() => {
    console.log('받은 데이터는 여기에');
  });
  return (
    <Box sx={{ p: 4 }}>
      <CardWrapper container spacing={0}>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>Roas</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumRoasList}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              <Event>변화량</Event>
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>광고비</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumCostList}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              <Event>변화량</Event>
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>노출수</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumImpList}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              <Event>변화량</Event>
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>클릭수</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumClickList}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              <Event>변화량</Event>
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>전환수</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumCvrList}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              <Event>변화량</Event>
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>매출</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumConvValue}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              <Event>변화량</Event>
            </ChangeValue>
          </Content>
        </ContentWraper>
      </CardWrapper>
    </Box>
  );
}

const CardWrapper = experimentalStyled(Grid)({
  background: '#fff',
  width: '100%',
  height: '100%',
  margin: 'auto',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '10px 10px 30px #e8e8e8',
});

const Title = experimentalStyled(Grid)({
  fontSize: '.5rem',
  width: '100%',
  marginTop: '1.5rem',
});

const ContentWraper = experimentalStyled(Grid)({
  display: 'flex',
  flexWrap: 'wrap',
  margint: 'auto',
});
const Content = experimentalStyled(Grid)({});

const Value = experimentalStyled(Grid)({
  color: '#000',
  background: '#fff',
  width: '100%',
  fontSize: '1rem',
  fontWeight: '700',
});

const ChangeValue = experimentalStyled(Grid)({
  fontSize: '.5rem',
  textAlign: 'left',
  height: '100%',
  dispaly: 'border',
});
const Event = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? 'blue' : 'red')};
  list-style: none;
  font-size: '.5rem';
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`;
