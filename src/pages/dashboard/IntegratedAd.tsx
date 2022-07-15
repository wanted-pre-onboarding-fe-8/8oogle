import React, { useEffect, useState } from 'react';
import { experimentalStyled } from '@mui/material/styles';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Indicators from './Indicators';
import { IOverallItem, IOverallItems } from '../../types/overall';
import { getDashboard } from '../../queries/queryRequest';

import Wrapper from './Wrapper';

interface IIntergratedAd {
  date: string;
  selectItems: string[];
}

function IntergratedAd({ date, selectItems }: IIntergratedAd): JSX.Element {
  const [dateState, setDateState] = useState<string[]>();

  function spliteDate(date: string) {
    const sperateDATE = date.split(' ~ ');
    return sperateDATE;
  }
  const [overall] = getDashboard('2022-02-01', '2022-02-06');
  const roasList: any[] = [];
  const costList: any[] = [];
  const impList: any[] = [];
  const clickList: any[] = [];
  const cvrList: any[] = [];
  const convValue: any[] = [];

  overall.data.map((data: any) => {
    roasList.push(data['roas']);
    costList.push(data['cost']);
    impList.push(data['imp']);
    clickList.push(data['click']);
    cvrList.push(data['cvr']);
    convValue.push(data['convValue']);
  });

  useEffect(() => {
    spliteDate(date);
  }, [date]);

  return (
    <Container maxWidth='md' sx={{ bgcolor: '#F6F7F8' }}>
      <ContentWrapper container spacing={1}>
        <TitleArea item xs={12}>
          <Title p={3}>통합 광고 현황</Title>
        </TitleArea>
      </ContentWrapper>
      <Indicators
        roasList={roasList}
        costList={costList}
        impList={impList}
        clickList={clickList}
        cvrList={cvrList}
        convValue={convValue}
      />
      ;
    </Container>
  );
}

export default IntergratedAd;

const ContentWrapper = experimentalStyled(Grid)({});
const TitleArea = experimentalStyled(Grid)({});
const Title = experimentalStyled(Box)({
  fontSize: '2rem',
  fontWeight: '700',
  marginTop: '2rem',
});
