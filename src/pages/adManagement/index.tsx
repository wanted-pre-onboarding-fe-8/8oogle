import React, { Suspense, useState } from 'react';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';
import { typeStatus } from '../../types/campaign';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Wrapper from './Wrapper';

const ALL = '전체';
const ACTIVE = '진행중';
const ENDED = '종료';
const selectItems = [ALL, ACTIVE, ENDED];
type typeStatusKo = typeof ALL | typeof ACTIVE | typeof ENDED;

function AdManagement() {
  const [statusKo, setStatusKo] = useState<typeStatusKo>(ALL);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setStatusKo(value as typeStatusKo);
  };

  return (
    <>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <Select value={statusKo} onChange={handleSelectChange}>
          {selectItems.map((item: string) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Suspense fallback={<div>Loading</div>}>
        <Wrapper status={getStatusEn(statusKo)} />
      </Suspense>
    </>
  );
}

export default AdManagement;

function getStatusEn(statusKo: typeStatusKo): typeStatus {
  const { STATUS_ALL, STATUS_ACTIVE, STATUS_ENDED } = CAMPAIGN_CONSTANTS;
  const statusObj = {
    [ALL]: STATUS_ALL,
    [ACTIVE]: STATUS_ACTIVE,
    [ENDED]: STATUS_ENDED,
  };

  return statusObj[statusKo];
}
