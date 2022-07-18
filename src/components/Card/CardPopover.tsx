import React from 'react';
import { Button, CardActions, Popover, Typography } from '@mui/material';
import styled from 'styled-components';

interface CardPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onDeleteClick: () => void;
  onPopoverClose: () => void;
}

function CardPopover({ anchorEl, onDeleteClick, onPopoverClose }: CardPopoverProps) {
  const open = Boolean(anchorEl);

  return (
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
      onClose={onPopoverClose}
    >
      <Typography sx={{ p: 2 }}>광고를 삭제 하시겠습니까?</Typography>
      <ButtonWrapper>
        <Button size='small' variant='outlined' color='warning' onClick={onDeleteClick}>
          삭제
        </Button>
        <Button size='small' variant='outlined' color='inherit' onClick={onPopoverClose}>
          취소
        </Button>
      </ButtonWrapper>
    </Popover>
  );
}

const ButtonWrapper = styled(CardActions)`
  justify-content: space-around;
  & > button {
    color: black;
    border: 1px solid rgba(224, 224, 224, 1);
  }
`;

export default CardPopover;
