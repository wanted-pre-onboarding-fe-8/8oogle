import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { experimentalStyled } from '@mui/material/styles';
import styled, { css } from 'styled-components';
import { OVERALL_CONSTANTS } from '../../utils/constants/data';

import compareValue from '../../utils/helpers/compareValue';

export default function Indicators({
  roasList,
  costList,
  impList,
  clickList,
  cvrList,
  convValue,
  prevRoasList,
  prevCostList,
  prevImpList,
  prevClickList,
  prevCvrList,
  prevConvValue,
}: any): JSX.Element {
  const { OVERALL, ROAS, IMP, CLICK, COST, CONV, CONV_VALUE, CTR, CVR, CPC, CPA } =
    OVERALL_CONSTANTS;

  const INITIAL_VALUE = 0;
  const sumRoas =
    roasList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE) / roasList.length;
  const sumCost = costList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumImp = impList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumClick = clickList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumCvr = cvrList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumConvValue = convValue.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);

  const sumBeforeRoas =
    prevRoasList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE) /
    prevRoasList.length;
  const sumBeforeCost = prevCostList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumBeforeImp = prevImpList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumBeforeClick = prevClickList.reduce(
    (a: number, b: number): number => a + b,
    INITIAL_VALUE,
  );
  const sumBeforeCvr = prevCvrList.reduce((a: number, b: number): number => a + b, INITIAL_VALUE);
  const sumBeforeConvValue = prevConvValue.reduce(
    (a: number, b: number): number => a + b,
    INITIAL_VALUE,
  );
  const compareRoas = compareValue(sumRoas, sumBeforeRoas);
  const compareCost = compareValue(sumCost, sumBeforeCost);
  const compareImp = compareValue(sumImp, sumBeforeImp);
  const compareClick = compareValue(sumClick, sumBeforeClick);
  const compareCvr = compareValue(sumCvr, sumBeforeCvr);
  const compareConvValue = compareValue(sumConvValue, sumBeforeConvValue);

  function compareValueAction(key: string) {
    switch (key) {
      case ROAS:
        return sumRoas > sumBeforeRoas;
      case COST:
        return sumCost > sumBeforeCost;
      case IMP:
        return sumImp > sumBeforeImp;
      case CLICK:
        return sumClick > sumBeforeClick;
      case CVR:
        return sumCvr > sumBeforeCvr;
      case CONV_VALUE:
        return sumConvValue > sumBeforeConvValue;
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <CardWrapper container spacing={0}>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>Roas</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumRoas.toFixed(2)}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              {!compareRoas ? (
                <NoEvent>--</NoEvent>
              ) : (
                <Event active={compareValueAction(ROAS)}>{compareRoas.toFixed(1)}</Event>
              )}
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>광고비</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumCost.toFixed(2)}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              {!compareCost ? (
                <NoEvent>--</NoEvent>
              ) : (
                <Event active={compareValueAction(COST)}>{compareCost.toFixed(1)}</Event>
              )}
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>노출수</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumImp.toFixed(2)}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              {!compareImp ? (
                <NoEvent>--</NoEvent>
              ) : (
                <Event active={compareValueAction(IMP)}>{compareImp.toFixed(1)}</Event>
              )}
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>클릭수</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumClick.toFixed(2)}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              {!compareClick ? (
                <NoEvent>--</NoEvent>
              ) : (
                <Event active={compareValueAction(CLICK)}>{compareClick.toFixed(1)}</Event>
              )}
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>전환수</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumCvr.toFixed(2)}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              {!compareCvr ? (
                <NoEvent>--</NoEvent>
              ) : (
                <Event active={compareValueAction(CVR)}>{compareCvr.toFixed(1)}</Event>
              )}
            </ChangeValue>
          </Content>
        </ContentWraper>
        <ContentWraper item xs={2} sm={4}>
          <Title p={2}>매출</Title>
          <Content item xs={6} sm={6}>
            <Value p={2}>{sumConvValue.toFixed(2)}</Value>
          </Content>
          <Content item xs={6} sm={6}>
            <ChangeValue p={2}>
              {!compareConvValue ? (
                <NoEvent>--</NoEvent>
              ) : (
                <Event active={compareValueAction(CONV_VALUE)}>{compareConvValue.toFixed(1)}</Event>
              )}
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
const NoEvent = styled.span`
  font-size: 1rem;
`;

const Event = styled.span<{ active?: boolean }>`
  font-size: 1rem;
  ${({ active }) =>
    active
      ? css`
          color: red;
          &::before {
            content: '▲';
          }
        `
      : css`
          color: blue;
          &::before {
            content: '▼';
          }
        `};

  list-style: none;
  font-size: '.5rem';
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`;
