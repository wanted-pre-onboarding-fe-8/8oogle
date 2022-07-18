import React, { ChangeEvent, useState } from 'react';
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
import { currencyFormatter } from '../utils/helpers/formatters';
import format from 'date-fns/format';
import useInput from '../hooks/useInput';

interface CardProps {
  campaignItem?: ICampaignItemBase;
  onSubmit?: (value: ICampaignItemBase) => void;
  onError?: () => void;
  title: JSX.Element;
}

function AdForm({
  campaignItem = mockItem,
  title,
  onSubmit = (value: ICampaignItemBase) => {
    console.log('제출쓰', value);
  },
}: CardProps) {
  const [values, setValues, onChange] = useInput<ICampaignItemBase>(campaignItem);

  const Rows = [
    {
      label: '광고유형',
      content: (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select
            labelId='demo-select-small'
            id='demo-select-small'
            name='adType'
            value={values.adType}
            onChange={onChange}
          >
            <MenuItem value='web'>웹광고</MenuItem>
            <MenuItem value='mobile'>모바일광고</MenuItem>
            <MenuItem value='paper'>지면광고</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      label: '광고이름',
      content: <Input type='text' value={values.title} onChange={onChange} name='title' />,
    },
    {
      label: '예산',
      content: (
        <CurrencyField
          setCurrencyValue={(value: number) => {
            setValues((pre) => ({ ...pre, budget: value }));
          }}
        />
      ),
    },
    {
      label: '광고시작일',
      content: (
        <Input
          type='date'
          name='startDate'
          value={values.startDate ? format(new Date(values.startDate), 'yyyy-MM-dd') : ''}
          onChange={onChange}
        />
      ),
    },
    {
      label: '광고종료일',
      content: (
        <Input
          name='endDate'
          value={values.endDate ? format(new Date(values.endDate), 'yyyy-MM-dd') : ''}
          onChange={onChange}
          type='date'
        />
      ),
    },
    {
      label: '광고비용',
      content: (
        <CurrencyField
          setCurrencyValue={(value: number) => {
            setValues((pre) => ({ ...pre, report: { ...pre.report, cost: value } }));
          }}
        />
      ),
    },
    {
      label: '전환횟수',
      content: (
        <Input
          type='number'
          name='convValue'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValues((pre) => ({
              ...pre,
              report: { ...pre.report, convValue: Number(e.target.value) },
            }));
          }}
          value={values.report.convValue}
          endAdornment='번'
        />
      ),
    },
    {
      label: 'ROAS',
      content: (
        <Input
          type='number'
          name='roas'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValues((pre) => ({
              ...pre,
              report: { ...pre.report, roas: Number(e.target.value) },
            }));
          }}
          value={values.report.roas}
          endAdornment='번'
        />
      ),
    },
  ];

  return (
    <BasicCard variant='outlined' style={{ borderRadius: '12px' }}>
      {title}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(values);
        }}
      >
        <Grid container spacing={2} justifyContent='center' alignItems={'center'}>
          {Rows.map((row) => (
            <GridRow key={row.label} label={row.label} content={row.content} />
          ))}
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

const CurrencyField = ({ setCurrencyValue }: { setCurrencyValue: (value: number) => void }) => {
  const [money, setMoney] = useState('0');
  return (
    <FormControl>
      <Input
        endAdornment={<InputAdornment position='end'>원</InputAdornment>}
        type='string'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const currentValue = e.currentTarget.value;
          const removeCharacter = currentValue.replace(/[^0-9,]/g, '').replaceAll(',', '');
          const numberOfValue = Number(removeCharacter);
          setCurrencyValue(numberOfValue);
          setMoney(numberOfValue.toLocaleString());
        }}
        value={money}
      />
      <FormHelperText>{currencyFormatter(Number(money.replaceAll(',', '')))}</FormHelperText>
    </FormControl>
  );
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
