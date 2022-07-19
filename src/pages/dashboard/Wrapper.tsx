import React from 'react';
import { getDashboard } from '../../queries/queryRequest';
import IntergratedAd from './IntegratedAd';

interface IWrapper {
  currStartDate: string;
  currEndDate: string;
  prevStartDate: string;
  prevEndDate: string;
}

function Wrapper({ prevStartDate, prevEndDate, currStartDate, currEndDate }: IWrapper) {
  const [{ data: prevOverall }, { data: prevPlatform }] = getDashboard(prevStartDate, prevEndDate);
  const [{ data: currOverall }, { data: currPlatform }] = getDashboard(currStartDate, currEndDate);

  return <IntergratedAd prevOverall={prevOverall} currOverall={currOverall} />;
}

export default Wrapper;
