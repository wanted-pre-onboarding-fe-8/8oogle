import { useQuery } from 'react-query';
import { OVERALL, PLATFORM, overallService, platformService } from './services';
import { get } from './httpRequest';

export function getDashboard(startDate: string, endDate: string) {
  const query = `?date_gte=${startDate}&date_lte=${endDate}`;

  const overall = useQuery([OVERALL, startDate], () => get(overallService, query));
  const platform = useQuery([PLATFORM, startDate], () => get(platformService, query));

  return [overall, platform];
}
