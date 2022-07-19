import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import AdForm from '../../components/adForm/AdForm';
import { ICampaignItemBase } from '../../types/campaign';
import { createCampaign } from '../../queries/queryRequest';
import { useNavigate } from 'react-router-dom';

function AdAdd() {
  const navigate = useNavigate();
  const { mutate, isError } = createCampaign();
  const [validValue, setValidValue] = useState(true);

  const validateValues = (values: ICampaignItemBase) => {
    for (const value of Object.values(values)) {
      if (!value) {
        return false;
      }
    }
    return true;
  }; // endDate따로 처리해줘야 함.

  const onSubmit = (values: ICampaignItemBase) => {
    // if (!validateValues(values)) {
    //   setValidValue(false);
    // } else {
    //   mutate(
    //     { ...values, id: Date.now() },
    //     {
    //       onError: (error) => console.log('뮤테이션에러', error),
    //       onSuccess: (data) => {
    //         console.log('성공쓰', data);
    //         navigate(-1);
    //       },
    //     },
    //   );
    // }
    mutate(
      { ...values, startDate: values.startDate + 'T00:00:00', id: Date.now() },
      {
        onError: (error) => console.log('뮤테이션에러', error),
        onSuccess: (data) => {
          console.log('성공쓰', data);
        },
      },
    );
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
