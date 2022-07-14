import React from 'react';
import { ICampaignItem } from '../../types/campaign';

// interface CardProps {
//   campaignItem: ICampaignItem;
// }

function Card(/*{ campaignItem }: CardProps*/) {
  const campaignItem: ICampaignItem = {
    id: 1,
    adType: 'web',
    title: '광고 1234',
    budget: 500000,
    status: 'active',
    startDate: '2020-10-19T00:00:00',
    endDate: null,
    report: {
      cost: 267144117,
      convValue: 1157942685,
      roas: 433,
    },
  };
  return <></>;
}

export default Card;
