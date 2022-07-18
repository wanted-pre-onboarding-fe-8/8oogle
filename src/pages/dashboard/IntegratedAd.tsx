import React, { useEffect, useState } from 'react';
import { experimentalStyled } from '@mui/material/styles';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Indicators from './Indicators';
import { IOverallItems, IOverallItem } from '../../types/overall';

interface IDataListType {
  ListType: number[];
}

interface IIntergratedAdProps {
  [x: string]: number | any;
  overall: IOverallItems;
}

interface Idate {
  data: number[] | any | any[];
}

function IntergratedAd(overall: IIntergratedAdProps): JSX.Element {
  const roasList: IDataListType['ListType'] = [];
  const costList: IDataListType['ListType'] = [];
  const impList: IDataListType['ListType'] = [];
  const clickList: IDataListType['ListType'] = [];
  const cvrList: IDataListType['ListType'] = [];
  const convValueList: IDataListType['ListType'] = [];

  const selectOverall = overall;

  selectOverall.forEach((data: IOverallItem) => {
    roasList.push(data.roas);
    costList.push(data.cost);
    impList.push(data.imp);
    clickList.push(data.click);
    cvrList.push(data.cvr);
    convValueList.push(data.convValue);
  });

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
        convValue={convValueList}
      />
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
