import React, { useEffect } from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { createAdvertismentSeries } from '../../utils/helpers/charts';
import { IOverallItems, IOverallItem } from '../../types/overall';
import format from 'date-fns/format';
import { OVERALL_CONSTANTS } from '../../utils/constants/data';
const { IMP, CLICK, CONV, CONV_VALUE, COST, CTR, CVR, CPC, CPA, ROAS, DATE_TYPE_MM_DD } =
  OVERALL_CONSTANTS;

const selectOptions = [IMP, CLICK, CONV, CONV_VALUE, COST, CTR, CVR, CPC, CPA, ROAS];
interface PlatformChartProps {
  items: IOverallItems;
}

export default function AdvertisementStatusChart({ items }: PlatformChartProps): JSX.Element {
  const [selectId1, setSelectId1] = React.useState<string>(ROAS);
  const [selectId2, setSelectId2] = React.useState<string>(CLICK);

  const [series, setSeries] = React.useState<ApexAxisChartSeries>([]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.name === 'selectId1') {
      setSelectId1(event.target.value as string);
    } else {
      setSelectId2(event.target.value as string);
    }
  };

  const dateCategories = items.map((overallItem: IOverallItem): string =>
    format(new Date(overallItem.date), DATE_TYPE_MM_DD),
  );

  useEffect(() => {
    const getSeries = createAdvertismentSeries(items, selectId1, selectId2);
    setSeries(getSeries);
  }, [items, selectId1, selectId2]);

  const chartOptions: ApexOptions = {
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
      <Chart options={chartOptions} type='line' series={series} height={350} />
    </>
  );
}

const GraphSelects = styled.div`
  display: flex;
`;
