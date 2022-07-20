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
import { PLATFORM_CONSTANTS } from '../../utils/constants/data';
import { IPlatformItem, IPlatformItems } from '../../types/platform';
import { convertFloatToInt } from '../../utils/helpers/number';

const { GOOGLE, KAKAO, NAVER, FACEBOOK, PLATFORM } = PLATFORM_CONSTANTS;

type tableDataType = Omit<IPlatformItem, 'date'>;
type KeyOfIPlatformItem = keyof IPlatformItem;
type platforms = typeof PLATFORM | typeof GOOGLE | typeof KAKAO | typeof NAVER | typeof FACEBOOK;
type DataAggregationByPlatform = {
  [key in platforms]: tableDataType;
};

const initialValue: tableDataType = {
  channel: '',
  imp: 0,
  click: 0,
  cost: 0,
  convValue: 0,
  ctr: 0,
  cvr: 0,
  cpc: 0,
  cpa: 0,
  roas: 0,
};

const initReducer: DataAggregationByPlatform = {
  [GOOGLE]: { ...initialValue, channel: 'google' },
  [KAKAO]: { ...initialValue, channel: 'kakao' },
  [NAVER]: { ...initialValue, channel: 'naver' },
  [FACEBOOK]: { ...initialValue, channel: 'facebook' },
  [PLATFORM]: { ...initialValue, channel: 'sum' },
};

export default function PlatformTable({ data }: { data: IPlatformItems }) {
  const [rows, setRows] = React.useState<tableDataType[]>([]);
  React.useEffect(() => {
    const reducedData = data.reduce(
      (storage: DataAggregationByPlatform, currentItem: IPlatformItem) => {
        const channel = currentItem.channel as platforms;
        for (const [key, value] of Object.entries(currentItem) as [
          key: KeyOfIPlatformItem,
          value: number,
        ][]) {
          if (key !== 'channel' && key !== 'date') {
            storage[channel][key] += value;
            storage[PLATFORM][key] += value;
          }
        }
        return storage;
      },
      initReducer,
    );
    setRows([...Object.values(reducedData)]);
  }, [data]);

  return (
    <div style={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <STableHead>
            <TableRow>
              <TableCell />
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
                <TableCell align='right'>{row.imp.toLocaleString()}</TableCell>
                <TableCell align='right'>{row.click.toLocaleString()}</TableCell>
                <TableCell align='right'>{row.convValue.toLocaleString()}</TableCell>
                <TableCell align='right'>{row.cost.toLocaleString()}</TableCell>
                <TableCell align='right'>{convertFloatToInt(row.cpa).toLocaleString()}</TableCell>
                <TableCell align='right'>{convertFloatToInt(row.ctr).toLocaleString()}</TableCell>
                <TableCell align='right'>{convertFloatToInt(row.cvr).toLocaleString()}</TableCell>
                <TableCell align='right'>{convertFloatToInt(row.roas).toLocaleString()}</TableCell>
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
