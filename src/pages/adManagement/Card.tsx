import React from 'react';
import { ICampaignItem } from '../../types/campaign';
import styled from 'styled-components';
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ad/edit/${campaignItem.id}`, { state: campaignItem });
  };

  return (
    <BasicCard variant='outlined' style={{ borderRadius: '12px' }}>
      <CardHeader title={campaignItem.title} sx={{ pb: 0 }} />
      <CardContent>
        <TableContainer>
          <Table size='small'>
            <TableBody>
              <Row style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                <TableCell>상태</TableCell>
                <TableCell>{campaignItem.status}</TableCell>
              </Row>
              <Row>
                <TableCell>광고 생성일</TableCell>
                <TableCell>{campaignItem.startDate}</TableCell>
              </Row>
              <Row>
                <TableCell>일 희망 예산</TableCell>
                <TableCell>{campaignItem.budget}</TableCell>
              </Row>
              <Row>
                <TableCell>광고 수익률</TableCell>
                <TableCell>{campaignItem.report.roas}</TableCell>
              </Row>
              <Row>
                <TableCell>매출</TableCell>
                <TableCell>{campaignItem.report.convValue}</TableCell>
              </Row>
              <Row>
                <TableCell>광고 비용</TableCell>
                <TableCell>{campaignItem.report.cost}</TableCell>
              </Row>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <ButtonWrapper sx={{ p: 0, pb: 2 }}>
        <Button size='small' variant='outlined' color='inherit' onClick={handleClick}>
          수정하기
        </Button>
        <Button size='small' variant='outlined' color='warning'>
          삭제하기
        </Button>
      </ButtonWrapper>
    </BasicCard>
  );
}

const BasicCard = styled(DefaultCard)`
  margin: 0 12px;
  margin-bottom: 12px;
  box-sizing: border-box;
  width: 100%;

  /* tablet */
  @media (min-width: 678px) {
    width: calc(50% - 24px);
  }

  /* desktop */
  @media (min-width: 1024px) {
    width: calc(33.33333% - 24px);
  }
`;

const Row = styled(TableRow)`
  & > td:first-child {
    padding-left: 0;
    color: gray;
  }

  & > td {
    padding: 0.5rem;
  }
`;

const ButtonWrapper = styled(CardActions)`
  justify-content: space-around;
  & > button {
    color: black;
    border: 1px solid rgba(224, 224, 224, 1);
  }
`;

export default Card;
