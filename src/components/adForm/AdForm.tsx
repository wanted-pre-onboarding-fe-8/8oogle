import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Card as DefaultCard,
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import format from 'date-fns/format';
import { ICampaignItem } from '../../types/campaign';
import { CAMPAIGN_CONSTANTS } from '../../utils/constants/data';
import useInput from '../../hooks/useInput';
import CurrencyField from './CurrencyField';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  campaignItem: ICampaignItem;
  onSubmit: (value: ICampaignItem) => void;
  title: string;
}

function AdForm({ campaignItem, title, onSubmit }: CardProps) {
  const [values, setValues, onChange] = useInput<ICampaignItem>(campaignItem);
  const [isEndDateNull, setIsEndDateNull] = useState(false);
  const navigate = useNavigate();

  const setNestedReportValue = (key: string, value: string | number) => {
    setValues((pre) => ({ ...pre, report: { ...pre.report, [key]: value } }));
  };

  const Rows = [
    {
      label: '광고유형',
      content: (
        <Select name='adType' value={values.adType} onChange={onChange}>
          <MenuItem value='web'>웹광고</MenuItem>
          <MenuItem value='app'>모바일광고</MenuItem>
        </Select>
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
          initialValue={values.budget}
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
        <>
          <Input
            name='endDate'
            value={values.endDate ? format(new Date(values.endDate), 'yyyy-MM-dd') : ''}
            onChange={onChange}
            type='date'
            disabled={isEndDateNull}
            sx={{ marginRight: '20px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isEndDateNull}
                onChange={() => {
                  setIsEndDateNull((pre) => !pre);
                  setValues((pre) => ({ ...pre, endDate: null }));
                }}
              />
            }
            label='종료일을 지정하지 않습니다.'
          />
        </>
      ),
    },
    {
      label: '광고상태',
      content: (
        <Select name='status' value={values.status} onChange={onChange}>
          <MenuItem value={CAMPAIGN_CONSTANTS.STATUS_ACTIVE}>진행중</MenuItem>
          <MenuItem value={CAMPAIGN_CONSTANTS.STATUS_ENDED}>종료</MenuItem>
        </Select>
      ),
    },
    {
      label: '광고비용',
      content: (
        <CurrencyField
          initialValue={values.report.cost}
          setCurrencyValue={(value: number) => setNestedReportValue('cost', value)}
        />
      ),
    },
    {
      label: '전환횟수',
      content: (
        <Input
          type='number'
          name='convValue'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNestedReportValue('convValue', Number(e.target.value))
          }
          value={values.report.convValue || ''}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNestedReportValue('roas', Number(e.target.value))
          }
          value={values.report.roas || ''}
          endAdornment='번'
        />
      ),
    },
  ];

  return (
    <BasicCard variant='outlined' style={{ borderRadius: '12px' }}>
      <h1>{title}</h1>
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
          <Button
            variant='outlined'
            onClick={() => {
              navigate('/ad');
            }}
          >
            취소
          </Button>
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

const BasicCard = styled(DefaultCard)`
  margin: auto;
  margin-bottom: 12px;
  box-sizing: border-box;
  max-width: 1000px;
  padding: 50px;
`;

export default AdForm;
