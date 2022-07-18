import React from 'react';
import { ICampaignItem } from '../types/campaign';
import styled from 'styled-components';
import { TableContainer, TableBody, TableCell, Table, TableRow } from '@mui/material';
import { format } from 'date-fns';

interface CardTableProps {
  campaignItem: ICampaignItem;
}

function CardTable({ campaignItem }: CardTableProps) {
  const date = new Date(campaignItem.startDate);

  return (
    <TableContainer>
      <Table size='small'>
        <TableBody>
          <Row style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
            <TableCell>상태</TableCell>
            <TableCell>{campaignItem.status === 'active' ? '진행중' : '종료'}</TableCell>
          </Row>
          <Row>
            <TableCell>광고 생성일</TableCell>
            <TableCell>{format(date, 'yyyy-MM-dd')}</TableCell>
          </Row>
          <Row>
            <TableCell>일 희망 예산</TableCell>
            <TableCell>{campaignItem.budget / 10000}만원</TableCell>
          </Row>
          <Row>
            <TableCell>광고 수익률</TableCell>
            <TableCell>{campaignItem.report.roas}%</TableCell>
          </Row>
          <Row>
            <TableCell>매출</TableCell>
            <TableCell>
              {Math.floor(campaignItem.report.convValue / 10000).toLocaleString()}만원
            </TableCell>
          </Row>
          <Row>
            <TableCell>광고 비용</TableCell>
            <TableCell>
              {Math.floor(campaignItem.report.cost / 10000).toLocaleString()}만원
            </TableCell>
          </Row>
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
