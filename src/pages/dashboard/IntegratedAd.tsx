import React, { useEffect, useState } from 'react';
import { experimentalStyled } from '@mui/material/styles';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Indicators from './Indicators';
import { getDashboard } from '../../queries/queryRequest';

interface IIntergratedAd {
  date: string | any;
  selectItems: string[];
}

const defautlDate = ['2022-02-01', '2022-04-20'];
function IntergratedAd({ date, selectItems }: IIntergratedAd): JSX.Element {
  const [selectData, setSelectData] = useState<string[]>(defautlDate);

  function spliteDate(date: string): any | void | string[] {
    const sperateDate = date.split(' ~ ');
    return setSelectData(sperateDate);
  }

  const roasList: any[] = [];
  const costList: any[] = [];
  const impList: any[] = [];
  const clickList: any[] = [];
  const cvrList: any[] = [];
  const convValue: any[] = [];
  console.log('여기 보자 ', selectData);
  const [overall] = getDashboard(selectData[0], selectData[1]);

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
    console.log(date);
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
