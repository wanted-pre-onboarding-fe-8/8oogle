import React from 'react';
import { getDashboard } from '../../queries/queryRequest';
import IntegratedAd from './IntegratedAd';
import AdvertisementStatusChart from './AdvertisementStatusChart';
import PlatformChart from './PlatformChart';
import PlatformTable from './PlatformTable';
import styled from 'styled-components';

interface IWrapper {
  currStartDate: string;
  currEndDate: string;
  prevStartDate: string;
  prevEndDate: string;
}

function Wrapper({ prevStartDate, prevEndDate, currStartDate, currEndDate }: IWrapper) {
  const [{ data: prevOverall }] = getDashboard(prevStartDate, prevEndDate);
  const [{ data: currOverall }, { data: currPlatform }] = getDashboard(currStartDate, currEndDate);

  return (
    <>
      <Div>
        <SubTitle>통합 광고 현황</SubTitle>
        <Card>
          <IntegratedAd prevOverall={prevOverall} currOverall={currOverall} />
          <AdvertisementStatusChart items={currOverall} />
        </Card>
      </Div>
      <Div>
        <SubTitle>매체 현황</SubTitle>
        <Card>
          <PlatformChart platforms={currPlatform} />
          <PlatformTable data={currPlatform} />
        </Card>
      </Div>
    </>
  );
}

export default Wrapper;

const Div = styled.div``;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px #bebebe;
  margin-bottom: 70px;
  padding: 20px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;
