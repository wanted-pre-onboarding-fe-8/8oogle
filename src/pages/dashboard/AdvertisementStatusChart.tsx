import React from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { createAdvertismentSeries } from '../../utils/helpers/charts';
import { IOverallItems, IOverallItem } from '../../types/overall';
import format from 'date-fns/format';

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

interface PlatformChartProps {
  items: IOverallItems;
}

export default function AdvertisementStatusChart({ items }: PlatformChartProps): JSX.Element {
  const [selectId1, setSelectId1] = React.useState('roas');
  const [selectId2, setSelectId2] = React.useState('click');

  const [series, setSeries] = React.useState<ApexAxisChartSeries>(
    createAdvertismentSeries(items, selectId1, selectId2),
  );

  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'selectId1') {
      setSelectId1(event.target.value as string);
    } else {
      setSelectId2(event.target.value as string);
    }

    const getSeries = createAdvertismentSeries(items, selectId1, selectId2);
    setSeries(getSeries);
  };

  const dateCategories = items.map((overallItem: IOverallItem): string =>
    format(new Date(overallItem.date), 'MM월 dd일'),
  );

  const ADVERTISEMENT_CHART_OPTIONS: ApexOptions = {
    chart: {
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
    yaxis: {
      labels: {
        formatter: function (value) {
          const val: string = value.toLocaleString();
          return val;
        },
      },
    },
    legend: {
      show: false,
    },
  };

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
      <Chart options={ADVERTISEMENT_CHART_OPTIONS} type='line' series={series} height={350} />
    </>
  );
}

const GraphSelects = styled.div`
  display: flex;
`;
