import React from 'react';
import { getDashboard } from '../../queries/queryRequest';

interface IWrapper {
  currStartDate: string;
  currEndDate: string;
  prevStartDate: string;
  prevEndDate: string;
}

function Wrapper({ prevStartDate, prevEndDate, currStartDate, currEndDate }: IWrapper) {
  const [{ data: prevOverall }, { data: prevPlatform }] = getDashboard(prevStartDate, prevEndDate);
  const [{ data: currOverall }, { data: currPlatform }] = getDashboard(currStartDate, currEndDate);

  return <div>hello</div>;
}

export default Wrapper;
