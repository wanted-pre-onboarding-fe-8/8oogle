import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import AdForm from '../../components/adForm/AdForm';
import { ICampaignItemBase } from '../../types/campaign';
import { createCampaign, invalidateQueriesByName } from '../../queries/queryRequest';
import { useNavigate } from 'react-router-dom';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';
import { useQueryClient } from 'react-query';

function AdAdd() {
  const navigate = useNavigate();
  const { mutateAsync } = createCampaign();

  const queryClient = useQueryClient();
  const onSubmit = async (values: ICampaignItemBase) => {
    await mutateAsync(values);
    await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
    navigate('/ad');
  };

  return (
    <div>
      <AdForm
        title='광고추가'
        onSubmit={onSubmit}
        onCancle={() => {
          navigate(-1);
        }}
      />
    </div>
  );
}

export default AdAdd;
