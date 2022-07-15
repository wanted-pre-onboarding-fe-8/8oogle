import { IPlatformItems, IPlatformItem } from '../../types/platform';

const createPlatformSeries = (platforms: IPlatformItems) => {
  const map = processIndicatorsToMap(platforms, initPlatformMap());
  const series = convertMapToSeries(map);
  return series;

  function initPlatformMap() {
    // 광고비, 매출, 노출수, 클릭수, 전환수, 전체건수 항목으로 초기화
    const platformMap = new Map<string, number[]>([
      ['google', Array(6).fill(0)],
      ['naver', Array(6).fill(0)],
      ['facebook', Array(6).fill(0)],
      ['kakao', Array(6).fill(0)],
    ]);

    return platformMap;
  }
  function processIndicatorsToMap(platforms: IPlatformItems, platformMap: Map<string, number[]>) {
    platforms.forEach((platform: IPlatformItem) => {
      const indicators = platformMap.get(platform.channel);

      if (indicators) {
        const [cost, sales, impression, click, conversion, count] = indicators;

        const newCost = platform.cost + cost;
        const newSales = platform.roas * platform.cost + sales;
        const newImpression = platform.imp + impression;
        const newClick = platform.click + click;
        const newConversion = platform.cvr * platform.imp + conversion;
        const newCount = count + 1;

        platformMap.set(platform.channel, [
          newCost,
          newSales,
          newImpression,
          newClick,
          newConversion,
          newCount,
        ]);
      }
    });

    platformMap.forEach(
      (indicators: number[], platformName: string, self: Map<string, number[]>) => {
        const averaged = indicators.map((indicator, index, self) => {
          const count = self[self.length - 1];

          const averagedIndicator = indicator / count;
          return averagedIndicator;
        });

        const countRemoved = averaged.slice(0, 5);
        self.set(platformName, countRemoved);
      },
    );

    return platformMap;
  }
  function convertMapToSeries(platformMap: Map<string, number[]>) {
    const series = [
      {
        name: '구글',
        data: platformMap.get('google') || [],
      },
      {
        name: '네이버',
        data: platformMap.get('naver') || [],
      },
      {
        name: '페이스북',
        data: platformMap.get('facebook') || [],
      },
      {
        name: '카카오',
        data: platformMap.get('kakao') || [],
      },
    ];

    return series;
  }
};

export { createPlatformSeries };
