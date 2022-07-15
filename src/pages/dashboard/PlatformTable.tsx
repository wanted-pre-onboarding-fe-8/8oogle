import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import styled from 'styled-components';
import { IPlatformItem, IPlatformItems } from '../../types/platform';

type reducerType = Omit<IPlatformItem, 'date'>;
type KeyOfIPlatformItem = keyof IPlatformItem;

const initReducer: reducerType[] = [
  {
    channel: 'google',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'kakao',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'naver',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'facebook',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'sum',
    imp: 0,
    click: 0,
    cost: 0,
    convValue: 0,
    ctr: 0,
    cvr: 0,
    cpc: 0,
    cpa: 0,
    roas: 0,
  },
];

// data는 임시 props. data props로 platform 데이터를 받는 거 가정.
export default function PlatformTable({ data = dummyData }: { data?: IPlatformItems }) {
  const [rows, setRows] = React.useState<reducerType[]>([]);
  React.useEffect(() => {
    const newData = data.reduce((pre: reducerType[], cur: IPlatformItem) => {
      if (cur.channel === 'google') {
        for (const [key, value] of Object.entries(cur) as [
          key: KeyOfIPlatformItem,
          value: number,
        ][]) {
          if (key !== 'channel' && key !== 'date') {
            pre[0][key] += value;
            pre[4][key] += value;
          }
        }
        return pre;
      } else if (cur.channel === 'kakao') {
        for (const [key, value] of Object.entries(cur) as [
          key: KeyOfIPlatformItem,
          value: number,
        ][]) {
          if (key !== 'channel' && key !== 'date') {
            pre[1][key] += value;
            pre[4][key] += value;
          }
        }
        return pre;
      } else if (cur.channel === 'naver') {
        for (const [key, value] of Object.entries(cur) as [
          key: KeyOfIPlatformItem,
          value: number,
        ][]) {
          if (key !== 'channel' && key !== 'date') {
            pre[2][key] += value;
            pre[4][key] += value;
          }
        }
      } else {
        for (const [key, value] of Object.entries(cur) as [
          key: KeyOfIPlatformItem,
          value: number,
        ][]) {
          if (key !== 'channel' && key !== 'date') {
            pre[3][key] += value;
            pre[4][key] += value;
          }
        }
      }
      return pre;
    }, initReducer);
    setRows(newData);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <STableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='right'>IMP</TableCell>
              <TableCell align='right'>클릭수</TableCell>
              <TableCell align='right'>전환횟수</TableCell>
              <TableCell align='right'>광고비</TableCell>
              <TableCell align='right'>CPA</TableCell>
              <TableCell align='right'>CTR</TableCell>
              <TableCell align='right'>전환율</TableCell>
              <TableCell align='right'>ROAS</TableCell>
            </TableRow>
          </STableHead>
          <STableBody>
            {rows.map((row) => (
              <TableRow key={row.channel}>
                <TableCell component='th' scope='row'>
                  {row.channel}
                </TableCell>
                <TableCell align='right'>{row.imp}</TableCell>
                <TableCell align='right'>{row.click}</TableCell>
                <TableCell align='right'>{row.convValue.toLocaleString()}</TableCell>
                <TableCell align='right'>{row.cost.toLocaleString()}</TableCell>
                <TableCell align='right'>{parseInt(row.cpa.toLocaleString())}</TableCell>
                <TableCell align='right'>{Math.ceil(row.ctr).toLocaleString()}</TableCell>
                <TableCell align='right'>{Math.ceil(row.cvr).toLocaleString()}</TableCell>
                <TableCell align='right'>{Math.ceil(row.roas).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </STableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const STableHead = styled(TableHead)`
  & th,
  & td {
    color: #948b8b;
  }
`;

const STableBody = styled(TableBody)`
  & > tr:nth-child(5) > th,
  & > tr:nth-child(5) > td {
    color: #007bff;
  }
`;

const dummyData = [
  {
    channel: 'google',
    date: '2022-02-01',
    imp: 50,
    click: 7,
    cost: 2098,
    convValue: 0,
    ctr: 14,
    cvr: 0,
    cpc: 299.7143,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'google',
    date: '2022-02-02',
    imp: 61,
    click: 13,
    cost: 1928,
    convValue: 0,
    ctr: 21.3115,
    cvr: 0,
    cpc: 148.3077,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'google',
    date: '2022-02-03',
    imp: 110,
    click: 22,
    cost: 2351,
    convValue: 7,
    ctr: 20,
    cvr: 31.8182,
    cpc: 106.8636,
    cpa: 335.8571,
    roas: 6295.4062,
  },
  {
    channel: 'google',
    date: '2022-02-04',
    imp: 109,
    click: 25,
    cost: 2566,
    convValue: 0,
    ctr: 22.9358,
    cvr: 0,
    cpc: 102.64,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'google',
    date: '2022-02-05',
    imp: 62,
    click: 12,
    cost: 3006,
    convValue: 9,
    ctr: 19.3548,
    cvr: 75,
    cpc: 250.5,
    cpa: 334,
    roas: 5619.7272,
  },
  {
    channel: 'naver',
    date: '2022-02-01',
    imp: 9412,
    click: 228,
    cost: 126490,
    convValue: 26,
    ctr: 2.4224,
    cvr: 11.4035,
    cpc: 554.7807,
    cpa: 4865,
    roas: 1659.6253,
  },
  {
    channel: 'naver',
    date: '2022-02-02',
    imp: 11024,
    click: 320,
    cost: 138500,
    convValue: 24,
    ctr: 2.9028,
    cvr: 7.5,
    cpc: 432.8125,
    cpa: 5770.8333,
    roas: 1397.4007,
  },
  {
    channel: 'naver',
    date: '2022-02-03',
    imp: 10549,
    click: 331,
    cost: 131910,
    convValue: 33,
    ctr: 3.1377,
    cvr: 9.9698,
    cpc: 398.5196,
    cpa: 3997.2727,
    roas: 1783.5494,
  },
  {
    channel: 'naver',
    date: '2022-02-04',
    imp: 13179,
    click: 352,
    cost: 153290,
    convValue: 24,
    ctr: 2.6709,
    cvr: 6.8182,
    cpc: 435.483,
    cpa: 6387.0833,
    roas: 1458.4643,
  },
  {
    channel: 'naver',
    date: '2022-02-05',
    imp: 10944,
    click: 328,
    cost: 140180,
    convValue: 12,
    ctr: 2.9971,
    cvr: 3.6585,
    cpc: 427.378,
    cpa: 11681.6667,
    roas: 515.0164,
  },
  {
    channel: 'facebook',
    date: '2022-02-01',
    imp: 22175,
    click: 239,
    cost: 213700,
    convValue: 10,
    ctr: 1.0778,
    cvr: 4.1841,
    cpc: 894.1423,
    cpa: 21370,
    roas: 696.4155,
  },
  {
    channel: 'facebook',
    date: '2022-02-02',
    imp: 19126,
    click: 269,
    cost: 216822,
    convValue: 9,
    ctr: 1.4065,
    cvr: 3.3457,
    cpc: 806.0297,
    cpa: 24091.3333,
    roas: 373.9934,
  },
  {
    channel: 'facebook',
    date: '2022-02-03',
    imp: 18914,
    click: 267,
    cost: 242858,
    convValue: 13,
    ctr: 1.4117,
    cvr: 4.8689,
    cpc: 909.5805,
    cpa: 18681.3846,
    roas: 232.4568,
  },
  {
    channel: 'facebook',
    date: '2022-02-04',
    imp: 16879,
    click: 225,
    cost: 242896,
    convValue: 26,
    ctr: 1.333,
    cvr: 11.5556,
    cpc: 1079.5378,
    cpa: 9342.1538,
    roas: 804.8177,
  },
  {
    channel: 'facebook',
    date: '2022-02-05',
    imp: 15075,
    click: 228,
    cost: 254908,
    convValue: 6,
    ctr: 1.5124,
    cvr: 2.6316,
    cpc: 1118.0175,
    cpa: 42484.6667,
    roas: 193.9092,
  },
  {
    channel: 'kakao',
    date: '2022-02-01',
    imp: 19842,
    click: 85,
    cost: 29502,
    convValue: 1,
    ctr: 0.4284,
    cvr: 1.1765,
    cpc: 347.0824,
    cpa: 29502,
    roas: 274.9305,
  },
  {
    channel: 'kakao',
    date: '2022-02-02',
    imp: 23174,
    click: 88,
    cost: 29931,
    convValue: 1,
    ctr: 0.3797,
    cvr: 1.1364,
    cpc: 340.125,
    cpa: 29931,
    roas: 415.7562,
  },
  {
    channel: 'kakao',
    date: '2022-02-03',
    imp: 41830,
    click: 73,
    cost: 29931,
    convValue: 0,
    ctr: 0.1745,
    cvr: 0,
    cpc: 410.0137,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'kakao',
    date: '2022-02-04',
    imp: 40843,
    click: 91,
    cost: 30305,
    convValue: 0,
    ctr: 0.2228,
    cvr: 0,
    cpc: 333.022,
    cpa: 0,
    roas: 0,
  },
  {
    channel: 'kakao',
    date: '2022-02-05',
    imp: 29804,
    click: 86,
    cost: 29997,
    convValue: 0,
    ctr: 0.2886,
    cvr: 0,
    cpc: 348.8023,
    cpa: 0,
    roas: 0,
  },
];
