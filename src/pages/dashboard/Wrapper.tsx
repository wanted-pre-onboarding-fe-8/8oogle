import React from 'react';
import { getDashboard } from '../../queries/queryRequest';
import { IOverallItem } from '../../types/overall';
import { IPlatformItem } from '../../types/platform';

interface iWrapper {
  startDate: string;
  endDate: string;
}

function Wrapper({ startDate, endDate }: iWrapper) {
  const [{ data: overall }, { data: platform }] = getDashboard(startDate, endDate);

  return (
    <>
      {overall.map((overallItem: IOverallItem) => (
        <div key={overallItem.date}>{overallItem.date}</div>
      ))}
      {platform.map((platformItem: IPlatformItem) => (
        <div
          key={`${platformItem.date}${platformItem.channel}`}
        >{`${platformItem.date}${platformItem.channel}`}</div>
      ))}
    </>
  );
}

export default Wrapper;
