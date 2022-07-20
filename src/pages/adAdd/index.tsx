import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import AdForm from '../../components/adForm/AdForm';
import { ICampaignItemBase } from '../../types/campaign';
import { createCampaign, invalidateQueriesByName } from '../../queries/queryRequest';
import { useNavigate } from 'react-router-dom';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';

function AdAdd() {
  const navigate = useNavigate();
  const { mutateAsync, isError } = createCampaign();
  const [validValue, setValidValue] = useState(true);

  const validateValues = (values: ICampaignItemBase) => {
    for (const value of Object.values(values)) {
      if (!value) {
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (values: ICampaignItemBase) => {
    await mutateAsync(values, {
      onSuccess: (data) => {
        console.log('success', data);
        navigate('/ad');
      },
    });
    // await invalidateQueriesByName(CAMPAIGN_CONSTANTS.CAMPAIGN);
    // navigate('/ad');
  };

  return (
    <div>
      {isError && <Alert severity='warning'>실패</Alert>}
      {!validValue && <Alert severity='warning'>모든 값을 입력해주세요</Alert>}
      <AdForm
        title={<Typography variant='h4'>광고 추가</Typography>}
        onSubmit={onSubmit}
        onCancle={() => {
          navigate(-1);
        }}
      />
    </div>
  );
}

export default AdAdd;
