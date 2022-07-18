import React from 'react';
import Card from './Card';
import { ICampaignItem } from '../../types/campaign';
import { getCampaignByStatus } from '../../queries/queryRequest';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';

const { STATUS_ALL, STATUS_ACTIVE, STATUS_ENDED } = CAMPAIGN_CONSTANTS;

function Wrapper() {
  const campaign = getCampaignByStatus(STATUS_ALL);

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
