import React, { useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { IOverallItems, IOverallItem } from '../../types/overall';

const selectOptions = [
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

export default function adStatusChart({ items }: any) {
  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'selectId1') {
      setSelectId1(event.target.value as string);
    } else {
      setSelectId2(event.target.value as string);
    }
  };

  const [selectId1, setSelectId1] = React.useState('roas');
  const [selectId2, setSelectId2] = React.useState('click');

  const overallItems: IOverallItems = items;

  const dateCategories = overallItems.map((overallItem: IOverallItem): string => overallItem.date);

  const getSeries = (select: string): any => {
    let series: number[] | string[] = [];
    series = overallItems.map((overallItem) => overallItem[select]);
    return series;
  };

  const lineOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: dateCategories,
    },
    legend: {
      show: false,
    },
  };

  const [series1, setSeries1] = React.useState<number[]>([]);
  const [series2, setSeries2] = React.useState<number[]>([]);

  useEffect(() => {
    setSeries1(getSeries(selectId1));
    setSeries2(getSeries(selectId2));
  }, [selectId1, selectId2]);

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
            {selectOptions &&
              selectOptions.map((selectOption) => (
                <MenuItem key={selectOption} value={selectOption}>
                  {selectOption}
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
            {selectOptions &&
              selectOptions.map((selectOption) => (
                <MenuItem key={selectOption} value={selectOption}>
                  {selectOption}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </GraphSelects>
      <ApexChart
        type='line'
        height={220}
        width={750}
        series={[
          {
            name: selectId1,
            data: series1,
          },
          {
            name: selectId2,
            data: series2,
          },
        ]}
        options={lineOptions}
      />
    </>
  );
}

const GraphSelects = styled.div`
  display: flex;
`;
