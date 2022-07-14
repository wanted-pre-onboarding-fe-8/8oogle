import React from 'react';
import { ICampaignItem } from '../../types/campaign';
import {
  Button,
  Card as DefaultCard,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

// interface CardProps {
//   campaignItem: ICampaignItem;
// }

function Card() {
  const campaignItem: ICampaignItem = {
    id: 1,
    adType: 'web',
    title: '광고 1234',
    budget: 500000,
    status: 'active',
    startDate: '2020-10-19T00:00:00',
    endDate: null,
    report: {
      cost: 267144117,
      convValue: 1157942685,
      roas: 433,
    },
  };
  return (
    <DefaultCard variant='outlined'>
      <CardHeader title={campaignItem.title} />
      <CardContent>
        <TableContainer>
          <Table size='small'>
            <TableBody>
              <TableRow style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                <TableCell>상태</TableCell>
                <TableCell>{campaignItem.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>광고 생성일</TableCell>
                <TableCell>{campaignItem.startDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>일 희망 예산</TableCell>
                <TableCell>{campaignItem.budget}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>광고 수익률</TableCell>
                <TableCell>{campaignItem.report.roas}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>매출</TableCell>
                <TableCell>{campaignItem.report.convValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>광고 비용</TableCell>
                <TableCell>{campaignItem.report.cost}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button>수정하기</Button>
        <Button>삭제하기</Button>
      </CardActions>
    </DefaultCard>
  );
}

export default Card;
