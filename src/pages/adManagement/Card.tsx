import React, { MouseEvent, useState } from 'react';
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
  Popover,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface CardProps {
  campaignItem: ICampaignItem;
  onDelete: (id: number) => void;
}

function Card({ campaignItem, onDelete }: CardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const date = new Date(campaignItem.startDate);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate(`/ad/edit/${campaignItem.id}`, { state: campaignItem });
  };

  const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClick = () => {
    onDelete(campaignItem.id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
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
      </CardContent>
      <ButtonWrapper sx={{ p: 0, pb: 2 }}>
        <Button size='small' variant='outlined' color='inherit' onClick={handleModifyClick}>
          수정하기
        </Button>
        <Button size='small' variant='outlined' color='warning' onClick={handleCloseClick}>
          삭제하기
        </Button>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handlePopoverClose}
        >
          <Typography sx={{ p: 2 }}>광고를 삭제 하시겠습니까?</Typography>
          <ButtonWrapper>
            <Button size='small' variant='outlined' color='warning' onClick={handleDeleteClick}>
              삭제
            </Button>
            <Button size='small' variant='outlined' color='inherit' onClick={handlePopoverClose}>
              취소
            </Button>
          </ButtonWrapper>
        </Popover>
      </ButtonWrapper>
    </BasicCard>
  );
}

const BasicCard = styled(DefaultCard)`
  margin: 0 12px;
  margin-bottom: 12px;
  box-sizing: border-box;
  width: 100%;

  &:hover {
    border: 1px solid blue;
  }

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
