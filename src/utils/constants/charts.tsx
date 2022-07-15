import { ApexOptions } from 'apexcharts';

const PLATFORM_CHART_OPTIONS: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType: '100%',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
  },
  colors: ['#E60023', '#0C9D58', '#4185F3', '#F4B500'],
  xaxis: {
    categories: ['광고비', '매출', '노출수', '클릭수', '전환수'],
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        const formatted = `${value.toFixed(0)}%`;
        return formatted;
      },
    },
  },
  tooltip: {
    y: {
      formatter: (value: number) => {
        const formatted = `${value.toFixed(0)}`;
        return formatted;
      },
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'right',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
};

export { PLATFORM_CHART_OPTIONS };
