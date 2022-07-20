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

  const [validValue, setValidValue] = useState(true);

  const validateValues = (values: ICampaignItemBase) => {
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'endDate' && !value) {
        if (typeof value === 'number' && value >= 0) {
          continue;
        }
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (values: ICampaignItemBase) => {
    if (validateValues(values)) {
      setValidValue(true);
      await mutateAsync(values);
      await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
      navigate('/ad');
    } else {
      setValidValue(false);
    }
  };

  return (
    <div>
      {!validValue && (
        <Alert severity='warning'>모든 값을 입력해주세요. 숫자는 0을 초과해야 합니다.</Alert>
      )}
      <AdForm title='광고추가' onSubmit={onSubmit} />
    </div>
  );
}

export default AdAdd;
