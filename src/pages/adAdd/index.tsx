import React, { useState } from 'react';
import { Alert } from '@mui/material';
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
  const [errorMessage, setErrorMessage] = useState(
    '모든 값을 입력해주세요. 숫자는 0초과인 값이어야 합니다.',
  );

  const validateValues = (values: ICampaignItemBase) => {
    function isEmpty() {
      for (const [key, value] of Object.entries(values)) {
        if (key == 'endDate') continue;
        if (typeof value === 'number' && value > 0) continue;
        if (key === 'report') {
          const assemble = Object.values(values[key]).every((value) => value > 0);
          if (assemble) continue;
          else return false;
        }
        if (!value) {
          return false;
        }
      }
      return true;
    }

    function isSmallerStartDateThenEndDate() {
      if (!values.endDate) return true;
      if (values.startDate > values.endDate) {
        setErrorMessage('광고시작일은 광고종료일보다 빨라야합니다');
        return false;
      }
      return true;
    }

    if (!isEmpty()) {
      return false;
    }
    return isSmallerStartDateThenEndDate();
  };

  const onSubmit = async (values: ICampaignItemBase) => {
    if (validateValues(values)) {
      setValidValue(true);
      await mutateAsync({ ...values });
      await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
      navigate('/ad');
    } else {
      setValidValue(false);
    }
  };

  const initialValue = {
    id: Date.now(),
    adType: 'web',
    title: '',
    budget: 0,
    status: CAMPAIGN_CONSTANTS.STATUS_ACTIVE,
    startDate: '',
    endDate: null,
    report: {
      cost: 0,
      convValue: 0,
      roas: 0,
    },
  };

  return (
    <div>
      {!validValue && <Alert severity='warning'>{errorMessage}</Alert>}
      <AdForm title='광고추가' campaignItem={initialValue} onSubmit={onSubmit} />
    </div>
  );
}

export default AdAdd;
