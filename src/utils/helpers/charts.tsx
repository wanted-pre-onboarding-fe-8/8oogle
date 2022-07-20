import { IPlatformItems, IPlatformItem } from '../../types/platform';
import { IOverallItems } from '../../types/overall';
import { PLATFORM_CONSTANTS } from '../constants/data';

const { GOOGLE, NAVER, FACEBOOK, KAKAO } = PLATFORM_CONSTANTS;

const createPlatformSeries = (platforms: IPlatformItems) => {
  const map = processIndicatorsToMap(platforms, initPlatformMap());
  const series = convertMapToSeries(map);
  return series;

  function initPlatformMap() {
    const platformMap = new Map<string, number[]>([
      [GOOGLE, Array(6).fill(0)],
      [NAVER, Array(6).fill(0)],
      [FACEBOOK, Array(6).fill(0)],
      [KAKAO, Array(6).fill(0)],
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
        const newConversion = platform.cvr * platform.click + conversion;
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

          const averagedIndicator: number = indicator / count;
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
        data: platformMap.get(GOOGLE) || [],
      },
      {
        name: '네이버',
        data: platformMap.get(NAVER) || [],
      },
      {
        name: '페이스북',
        data: platformMap.get(FACEBOOK) || [],
      },
      {
        name: '카카오',
        data: platformMap.get(KAKAO) || [],
      },
    ];

    return series;
  }
};

const createAdvertismentSeries = (
  overallItems: IOverallItems,
  select1: string,
  select2: string,
) => {
  const series1 = {
    name: select1,
    data: overallItems.map((overallItem) => Number(overallItem[select1])),
  };
  const series2 = {
    name: select2,
    data: overallItems.map((overallItem) => Number(overallItem[select2])),
  };

  const series = [{ ...series1 }, { ...series2 }];
  return series;
};

export { createPlatformSeries, createAdvertismentSeries };
