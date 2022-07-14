import React from 'react';

import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const selectItems = [
  'imp',
  'click',
  'conv',
  'convValue',
  'cost',
  'ctr',
  'cvr',
  'cpc',
  'cpa',
  'roas',
];

export default function LineChart() {
  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'selectId1') {
      setSelectId1(event.target.value as string);
    } else {
      setSelectId2(event.target.value as string);
    }
  };

  const [selectId1, setSelectId1] = React.useState('roas');
  const [selectId2, setSelectId2] = React.useState('click');

  return (
    <>
      <GraphSelects>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select
            value={selectId1}
            name={'selectId1'}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {selectItems &&
              selectItems.map((selectItem) => (
                <MenuItem key={selectItem} value={selectItem}>
                  {selectItem}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select
            value={selectId2}
            name={'selectId2'}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {selectItems &&
              selectItems.map((selectItem) => (
                <MenuItem key={selectItem} value={selectItem}>
                  {selectItem}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </GraphSelects>
    </>
  );
}

const GraphSelects = styled.div`
  display: flex;
`;
