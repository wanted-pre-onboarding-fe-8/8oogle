import { IPlatformItems, IPlatformItem } from '../../types/platform';

const createPlatformSeries = (platforms: IPlatformItems) => {
  const map = processIndicatorsToMap(platforms, initPlatformMap());
  const series = convertMapToSeries(map);
  return series;

  function initPlatformMap() {
    const platformMap = new Map<string, number[]>([
      ['google', Array(5).fill(0)],
      ['naver', Array(5).fill(0)],
      ['facebook', Array(5).fill(0)],
      ['kakao', Array(5).fill(0)],
    ]);

    return platformMap;
  }
  function processIndicatorsToMap(platforms: IPlatformItems, platformMap: Map<string, number[]>) {
    platforms.forEach((platform: IPlatformItem) => {
      const indicators = platformMap.get(platform.channel);

      if (indicators) {
        const [cost, sales, impression, click, conversion] = indicators;

        const newCost = platform.cost + cost;
        const newSales = platform.roas * platform.cost + sales;
        const newImpression = platform.imp + impression;
        const newClick = platform.click + click;
        const newConversion = platform.cvr * platform.imp + conversion;

        platformMap.set(platform.channel, [
          newCost,
          newSales,
          newImpression,
          newClick,
          newConversion,
        ]);
      }
    });

    platformMap.forEach(
      (indicators: number[], platformName: string, self: Map<string, number[]>) => {
        const average = indicators.map((indicator) => indicator / platforms.length);
        self.set(platformName, average);
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
