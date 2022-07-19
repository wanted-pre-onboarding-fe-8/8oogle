import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';
import { typeStatus } from '../../types/campaign';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Container, FormControl, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Wrapper from './Wrapper';
import styled from 'styled-components';

const ALL = '전체';
const ACTIVE = '진행중';
const ENDED = '종료';
const selectItems = [ALL, ACTIVE, ENDED];
type typeStatusKo = typeof ALL | typeof ACTIVE | typeof ENDED;

function AdManagement() {
  const [statusKo, setStatusKo] = useState<typeStatusKo>(ALL);
  const navigate = useNavigate();

  const handleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    setStatusKo(value as typeStatusKo);
  };

  const createAd = () => {
    navigate('/ad/add');
  };

  return (
    <Container>
      <Typography variant='h5' sx={{ pl: 3, mt: 2, mb: 4 }} style={{ fontWeight: '700' }}>
        광고관리
      </Typography>
      <Layout>
        <ButtonWrapper>
          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <Select value={statusKo} onChange={handleSelectChange}>
              {selectItems.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={createAd}>광고 만들기</Button>
        </ButtonWrapper>
        <Suspense fallback={<div>Loading</div>}>
          <Wrapper status={getStatusEn(statusKo)} />
        </Suspense>
      </Layout>
    </Container>
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

const Layout = styled(Container)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: white;
  border-radius: 12px;
  overflow-y: scroll;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
`;
