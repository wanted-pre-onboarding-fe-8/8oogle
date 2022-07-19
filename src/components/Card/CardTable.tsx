import React from 'react';
import { ICampaignItem } from '../../types/campaign';
import styled from 'styled-components';
import { TableContainer, TableBody, TableCell, Table, TableRow } from '@mui/material';
import { format } from 'date-fns';

interface CardTableProps {
  campaignItem: ICampaignItem;
}

type TableType = {
  [key: string]: string;
  status: string;
  startDate: string;
  budget: string;
  roas: string;
  convValue: string;
  cost: string;
};

function CardTable({ campaignItem }: CardTableProps) {
  const date = new Date(campaignItem.startDate);

  const tableData: TableType = {
    status: '상태',
    startDate: '광고 생성일',
    budget: '일 희망 예산',
    roas: '광고 수익률',
    convValue: '매출',
    cost: '광고 비용',
  };

  const tableValue: TableType = {
    status: campaignItem.status === 'active' ? '진행중' : '종료',
    startDate: format(date, 'yyyy-MM-dd'),
    budget: `${campaignItem.budget / 10000}만원`,
    roas: `${campaignItem.report.roas}%`,
    convValue: `${Math.floor(campaignItem.report.convValue / 10000).toLocaleString()}만원`,
    cost: `${Math.floor(campaignItem.report.cost / 10000).toLocaleString()}만원`,
  };

  return (
    <TableContainer>
      <Table size='small'>
        <TableBody>
          {Object.keys(tableData).map((value, index) => (
            <Row key={index}>
              <TableCell>{tableData[value]}</TableCell>
              <TableCell>{tableValue[value]}</TableCell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CardTable;

const Row = styled(TableRow)`
  & > td:first-child {
    padding-left: 0;
    color: gray;
  }

  & > td {
    padding: 0.5rem;
  }
`;
