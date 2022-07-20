import React from 'react';
import { getCampaignByStatus } from '../../queries/queryRequest';
import { typeStatus, ICampaignItem } from '../../types/campaign';
import Card from '../../components/Card';
import styled from 'styled-components';

interface IWrapper {
  status: typeStatus;
}

export default function Wrapper({ status }: IWrapper) {
  const { data: campaign } = getCampaignByStatus(status);

  return (
    <CardList>
      {campaign.map((campaignItem: ICampaignItem) => (
        <Card
          key={campaignItem.id}
          campaignItem={campaignItem}
          onDelete={() => {
            console.log('delete');
          }}
        />
      ))}
    </CardList>
  );
}

const CardList = styled.div`
  grid-area: outlet;
  margin: 0 -12px;
  display: flex;
  flex-wrap: wrap;
`;
