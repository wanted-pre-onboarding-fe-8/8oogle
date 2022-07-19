import React, { Suspense, useState } from 'react';
import { format, addDays } from 'date-fns';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Wrapper from './Wrapper';
import Loader from './Loader';
import styled from 'styled-components';

const FIRST_DATE = new Date('2022-02-01');
const LAST_DATE = new Date('2022-04-20');
const INTERVAL = 5;

function Dashboard() {
  const selectItems = getSelectItems();
  const [date, setDate] = useState(selectItems[0]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setDate(value);
  };

  return (
    <Container>
      <InnerContainer>
        <Select value={date} onChange={handleSelectChange}>
          {selectItems.map((item: string) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

        <Suspense fallback={<Loader />}>
          <Wrapper startDate={splitRangeDate(date)[0]} endDate={splitRangeDate(date)[1]} />
        </Suspense>
      </InnerContainer>
    </Container>
  );
}

export default Dashboard;

const Container = styled.main`
  grid-area: outlet;
  height: 300vh;
`;
const InnerContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

function getSelectItems(): string[] {
  const items = [];
  let nowDate = FIRST_DATE;
  while (nowDate <= LAST_DATE) {
    const endDate = addDays(nowDate, INTERVAL);
    const str = formatRangeDate(nowDate, endDate);
    items.push(str);
    nowDate = addDays(nowDate, INTERVAL + 1);
  }

  return items;
}

function formatRangeDate(startDate: Date, endDate: Date): string {
  return `${format(startDate, 'yyyy-MM-dd')} ~ ${format(endDate, 'yyyy-MM-dd')}`;
}
function splitRangeDate(rangeDate: string) {
  const splitString = ' ~ ';
  return rangeDate.split(splitString);
}
