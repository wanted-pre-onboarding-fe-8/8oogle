import React from 'react';
import { getCampaignByStatus } from '../../queries/queryRequest';
import { typeStatus, ICampaignItem } from '../../types/campaign';
import Card from './Card';

interface IWrapper {
  status: typeStatus;
}

export default function Wrapper({ status }: IWrapper) {
  const { data: campaign } = getCampaignByStatus(status);

  return (
    <>
      {campaign.map((campaignItem: ICampaignItem) => (
        <Card
          key={campaignItem.id}
          campaignItem={campaignItem}
          onDelete={() => {
            console.log('delete');
          }}
        />
      ))}
    </>
  );
}
