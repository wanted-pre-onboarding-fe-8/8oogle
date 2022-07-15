import { ApexOptions } from 'apexcharts';

const platformBarOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType: '100%',
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
  xaxis: {
    categories: ['광고비', '매출', '노출수', '클릭수', '전환수'],
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        const formatted = `${Number(value.toFixed(0))}%`;
        return formatted;
      },
    },
    tooltip: {},
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'right',
    offsetX: 0,
    offsetY: 0,
  },
};

export { platformBarOptions };
