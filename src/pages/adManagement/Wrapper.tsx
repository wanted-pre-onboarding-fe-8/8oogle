import React from 'react';
import Card from './Card';
import { ICampaignItem } from '../../types/campaign';
import { getCampaign } from '../../queries/queryRequest';

function Wrapper() {
  const campaign = getCampaign();
  return (
    <>
      {campaign.data.map((campaignItem: ICampaignItem) => (
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

export default Wrapper;
