import React from 'react';
import Chart from 'react-apexcharts';
import { IPlatformItems } from '../../types/platform';
import { createPlatformSeries } from '../../utils/helpers/charts';
import { platformBarOptions } from '../../utils/constants/charts';
interface PlatformChartProps {
  platforms: IPlatformItems;
}

function PlatformChart({ platforms }: PlatformChartProps): JSX.Element {
  const series = createPlatformSeries(platforms);

  return <Chart options={platformBarOptions} series={series} type='bar' />;
}

export default PlatformChart;
