import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query';
import { get, post, put, _delete } from './httpRequest';
import { typeStatus, ICampaignItemBase } from '../types/campaign';
import { overallService, platformService, campaignService } from './services';

import { OVERALL_CONSTANTS, PLATFORM_CONSTANTS, CAMPAIGN_CONSTANTS } from '../utils/constants/data';
const { OVERALL } = OVERALL_CONSTANTS;
const { PLATFORM } = PLATFORM_CONSTANTS;
const { CAMPAIGN, STATUS_ALL } = CAMPAIGN_CONSTANTS;

export function getDashboard(startDate: string, endDate: string) {
  const query = `?date_gte=${startDate}&date_lte=${endDate}`;

  const overall = useQuery([OVERALL, startDate], () => get(overallService, query));
  const platform = useQuery([PLATFORM, startDate], () => get(platformService, query));

  return [overall, platform];
}

export function getCampaignByStatus(status: typeStatus) {
  const query = status === STATUS_ALL ? '' : `?status=${status}`;

  return useQuery([CAMPAIGN, status], () => get(campaignService, query));
}

export function useCreateCampaign() {
  const { mutateAsync } = useMutation((campaign: ICampaignItemBase) =>
    post(campaignService, campaign),
  );

  const queryClient = useQueryClient();

  return async function (campaign: ICampaignItemBase) {
    await mutateAsync(campaign);
    await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
  };
}

export function useUpdateCampaign(id: number) {
  const query = `/${id}`;
  const { mutateAsync } = useMutation((campaign: ICampaignItemBase) =>
    put(campaignService, query, campaign),
  );

  const queryClient = useQueryClient();

  return async function (campaign: ICampaignItemBase) {
    await mutateAsync(campaign);
    await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
  };
}

export function useDeleteCampaign(id: number) {
  const query = `/${id}`;
  const { mutateAsync } = useMutation(() => _delete(campaignService, query));

  const queryClient = useQueryClient();

  return async function () {
    await mutateAsync();
    await invalidateQueriesByName(queryClient, CAMPAIGN_CONSTANTS.CAMPAIGN);
  };
}

type typeDataName = typeof OVERALL | typeof PLATFORM | typeof CAMPAIGN;
export function invalidateQueriesByName(queryClient: QueryClient, name: typeDataName) {
  return queryClient.invalidateQueries({
    predicate: (query) => {
      return query.queryKey[0] === name;
    },
  });
}
