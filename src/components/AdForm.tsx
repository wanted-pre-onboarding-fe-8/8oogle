import React, { ChangeEvent, RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Card as DefaultCard,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { ICampaignItemBase } from '../types/campaign';
import { CAMPAIGN_CONSTANTS } from '../utils/constants/data';

interface CardProps {
  campaignItem?: ICampaignItemBase;
  onDelete?: (id: number) => void;
  title: JSX.Element;
}

function AdForm({ campaignItem = mockItem, title }: CardProps) {
  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dataRef = useRef<HTMLDivElement>(null);

  return (
    <BasicCard variant='outlined' style={{ borderRadius: '12px' }}>
      {title}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getInputValue(dataRef);
        }}
      >
        <Grid container spacing={2} justifyContent='center' alignItems={'center'} ref={dataRef}>
          <GridRow
            label='광고유형'
            content={
              <FormControl sx={{ m: 1, minWidth: 120 }} size='small' required>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  defaultValue={campaignItem.adType}
                  className='value'
                >
                  <MenuItem value='web'>웹광고</MenuItem>
                  <MenuItem value='mobile'>모바일광고</MenuItem>
                  <MenuItem value='paper'>지면광고</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <GridRow
            label='광고이름'
            content={
              <Input type='text' className='value' defaultValue={campaignItem.title} required />
            }
          />
          <GridRow label='예산' content={<MoneyField />} />
          <GridRow label='광고시작일' content={<Input type='date' required />} />
          <GridRow label='광고종료일' content={<Input type='date' required />} />
          <GridRow label='광고비용' content={<MoneyField />} />
          <GridRow label='전환횟수' content={<Input type='number' endAdornment='번' required />} />
          <GridRow label='ROAS' content={<Input type='number' endAdornment='%' required />} />
        </Grid>
        <ButtonGroup variant='contained' sx={{ marginTop: 3, float: 'right' }}>
          <Button variant='outlined'>취소</Button>
          <Button type='submit'>등록</Button>
        </ButtonGroup>
      </form>
    </BasicCard>
  );
}

const GridRow = ({ label, content }: { label: string; content: JSX.Element | string }) => {
  return (
    <>
      <Grid item xs={4}>
        {label}
      </Grid>
      <Grid item xs={8}>
        {content}
      </Grid>
    </>
  );
};

const MoneyField = () => {
  const [money, setMoney] = useState<string>('0');
  return (
    <FormControl required error>
      <Input
        endAdornment={<InputAdornment position='end'>원</InputAdornment>}
        type='string'
        id='money'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const currentValue = e.currentTarget.value;
          const removeCharacter = currentValue.replace(/[^0-9,]/g, '').replaceAll(',', '');
          setMoney(Number(removeCharacter).toLocaleString());
        }}
        value={money}
        required
      />
      <FormHelperText id='money'>
        ({moneyFormatter(Number(money?.replaceAll(',', '')))})
      </FormHelperText>
    </FormControl>
  );
};

function moneyFormatter(value: number) {
  const result: number[] = [];
  let unit = 1e12; // billion

  while (unit > 1) {
    const quotient = value / unit;
    value %= unit;
    result.push(Math.trunc(quotient));
    unit /= 1000;
  }
  let realResult = '';
  const hh = ['조', '억', '백만', '천'];
  hh.forEach((h, idx) => {
    if (idx == 3) {
      if (result[idx] >= 10) {
        realResult += `${Math.trunc(result[idx] / 10)}만`;
        realResult += `${result[idx] % 10}천`;
      }
    } else {
      if (result[idx]) {
        realResult += `${result[idx]}${h}`;
      }
    }
  });
  realResult += `${value}원`;

  return realResult;
}

const getInputValue = (ref: RefObject<HTMLDivElement>) => {
  const inputElements = ref.current?.getElementsByTagName('input');
  if (inputElements) {
    const data = [...inputElements];
    const result = data.map((dt) => {
      console.log(dt.value, data.values());
      return dt.value;
    });
    return result;
  }
  return [];
};

const BasicCard = styled(DefaultCard)`
  margin: auto;
  margin-bottom: 12px;
  box-sizing: border-box;
  max-width: 1000px;
  padding: 50px;
`;

const mockItem = {
  id: 1,
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

export default AdForm;
