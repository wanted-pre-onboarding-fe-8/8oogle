import React, { Suspense, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Wrapper from './Wrapper';
import Loader from './Loader';
import styled from 'styled-components';

const FIRST_DATE = new Date('2022-02-01');
const LAST_DATE = new Date('2022-04-20');
const INTERVAL = 6;

function Dashboard() {
  const selectItems = getSelectItems();
  const [rangeDate, setRangeDate] = useState(selectItems[0]);

  const currStartDate = splitRangeDate(rangeDate)[0];
  const currEndDate = splitRangeDate(rangeDate)[1];
  const prevStartDate = calcPrevDate(rangeDate)[0];
  const prevEndDate = calcPrevDate(rangeDate)[1];

  const handleSelectChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setRangeDate(value);
  };

  return (
    <Container>
      <InnerContainer>
        <HeaderContainer>
          <Title>대시보드</Title>
          <Select value={rangeDate} onChange={handleSelectChange}>
            {selectItems.map((item: string) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </HeaderContainer>
        <Suspense fallback={<Loader />}>
          <Wrapper
            currStartDate={currStartDate}
            currEndDate={currEndDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
          />
        </Suspense>
      </InnerContainer>
    </Container>
  );
}

export default Dashboard;

const Container = styled.main`
  grid-area: outlet;
`;
const InnerContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.div`
  margin: 30px 0px;
  font-size: 24px;
  font-weight: 600;
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

function calcPrevDate(rangeDate: string) {
  const startDate = splitRangeDate(rangeDate)[0];
  const endDate = splitRangeDate(rangeDate)[1];

  const splitStartDate = startDate.split('-');
  const splitEndDate = endDate.split('-');

  const prevStartDate = subDays(
    new Date(+splitStartDate[0], +splitStartDate[1] - 1, +splitStartDate[2]),
    INTERVAL + 1,
  );
  const prevEndDate = subDays(
    new Date(+splitEndDate[0], +splitEndDate[1] - 1, +splitEndDate[2]),
    INTERVAL + 1,
  );

  return splitRangeDate(formatRangeDate(prevStartDate, prevEndDate));
}
