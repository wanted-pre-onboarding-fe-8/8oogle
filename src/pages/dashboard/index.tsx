import React, { Suspense, useState } from 'react';
import { format, addDays } from 'date-fns';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Wrapper from './Wrapper';
import Loader from './Loader';
import AdStatusChart from './adStatusChart';

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
    <>
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
      <AdStatusChart items={items} />
    </>
  );
}

export default Dashboard;

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

const items = [
  {
    imp: 51479,
    click: 559,
    cost: 371790,
    conv: 37,
    convValue: 3668610,
    ctr: 1.09,
    cvr: 6.62,
    cpc: 665.1,
    cpa: 10048.38,
    roas: 986.74,
    date: '2022-02-01',
  },
  {
    imp: 53385,
    click: 690,
    cost: 387181,
    conv: 34,
    convValue: 2870740,
    ctr: 1.29,
    cvr: 4.93,
    cpc: 561.13,
    cpa: 11387.68,
    roas: 741.45,
    date: '2022-02-02',
  },
  {
    imp: 71403,
    click: 693,
    cost: 407050,
    conv: 53,
    convValue: 3065225,
    ctr: 0.97,
    cvr: 7.65,
    cpc: 587.37,
    cpa: 7680.19,
    roas: 753.03,
    date: '2022-02-03',
  },
  {
    imp: 71010,
    click: 693,
    cost: 429057,
    conv: 50,
    convValue: 4190550,
    ctr: 0.98,
    cvr: 7.22,
    cpc: 619.13,
    cpa: 8581.14,
    roas: 976.69,
    date: '2022-02-04',
  },
  {
    imp: 55885,
    click: 654,
    cost: 428091,
    conv: 27,
    convValue: 1385169,
    ctr: 1.17,
    cvr: 4.13,
    cpc: 654.57,
    cpa: 15855.22,
    roas: 323.57,
    date: '2022-02-05',
  },
  {
    imp: 48654,
    click: 708,
    cost: 443104,
    conv: 35,
    convValue: 2461510,
    ctr: 1.46,
    cvr: 4.94,
    cpc: 625.85,
    cpa: 12660.11,
    roas: 555.52,
    date: '2022-02-06',
  },
  {
    imp: 76577,
    click: 774,
    cost: 437323,
    conv: 84,
    convValue: 3625152,
    ctr: 1.01,
    cvr: 10.85,
    cpc: 565.02,
    cpa: 5206.23,
    roas: 828.94,
    date: '2022-02-07',
  },
];
