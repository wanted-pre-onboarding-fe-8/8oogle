import { useQuery, useMutation } from 'react-query';
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

  return useQuery([CAMPAIGN, status], () => get(campaignService, query), { staleTime: 0 });
}

export function createCampaign(campaign: ICampaignItemBase) {
  return useMutation(() => post(campaignService, campaign));
}

export function updateCampaign(id: number, campaign: ICampaignItemBase) {
  const query = `/${id}`;

  return useMutation(() => put(campaignService, query, campaign));
}

export function deleteCampaign(id: number) {
  const query = `/${id}`;

  return useMutation(() => _delete(campaignService, query));
}
