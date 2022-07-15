import React from 'react';
import Chart from 'react-apexcharts';
import { IPlatformItems } from '../../types/platform';
import { createPlatformSeries } from '../../utils/helpers/charts';
import { PLATFORM_CHART_OPTIONS } from '../../utils/constants/charts';
interface PlatformChartProps {
  platforms: IPlatformItems;
}

function PlatformChart({ platforms }: PlatformChartProps): JSX.Element {
  const series = createPlatformSeries(platforms);

  return <Chart options={PLATFORM_CHART_OPTIONS} series={series} type='bar' />;
}

export default PlatformChart;
