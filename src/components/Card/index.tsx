import React, { MouseEvent, useState } from 'react';
import { ICampaignItem } from '../../types/campaign';
import { deleteCampaign, invalidateQueriesByName } from '../../queries/queryRequest';
import { useQueryClient } from 'react-query';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';
import styled from 'styled-components';
import { Button, Card as DefaultCard, CardActions, CardContent, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardTable from './CardTable';
import CardPopover from './CardPopover';

interface CardProps {
  campaignItem: ICampaignItem;
}

function Card({ campaignItem }: CardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync } = deleteCampaign(campaignItem.id);

  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate('/ad/edit', { state: campaignItem });
  };

  const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClick = async () => {
    await mutateAsync();
    await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);

    setAnchorEl(null);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <BasicCard variant='outlined' style={{ borderRadius: '12px' }}>
      <CardHeader title={campaignItem.title} sx={{ pb: 0 }} />
      <CardContent>
        <CardTable campaignItem={campaignItem} />
      </CardContent>
      <ButtonWrapper sx={{ p: 0, pb: 2 }}>
        <Button size='small' variant='outlined' color='inherit' onClick={handleModifyClick}>
          수정하기
        </Button>
        <Button size='small' variant='outlined' color='warning' onClick={handleCloseClick}>
          삭제하기
        </Button>
        <CardPopover
          anchorEl={anchorEl}
          onPopoverClose={handlePopoverClose}
          onDeleteClick={handleDeleteClick}
        />
      </ButtonWrapper>
    </BasicCard>
  );
}

const BasicCard = styled(DefaultCard)`
  margin: 0 12px;
  margin-bottom: 12px;
  box-sizing: border-box;
  width: 100%;

  &:hover {
    border: 1px solid blue;
  }

  /* tablet */
  @media (min-width: 678px) {
    width: calc(50% - 24px);
  }

  /* desktop */
  @media (min-width: 1024px) {
    width: calc(33.33333% - 24px);
  }
`;

const ButtonWrapper = styled(CardActions)`
  justify-content: space-around;
  & > button {
    color: black;
    border: 1px solid rgba(224, 224, 224, 1);
  }
`;

export default Card;
