import { CAMPAIGN_CONSTANTS } from '../utils/constants/data';
const { STATUS_ALL, STATUS_ACTIVE, STATUS_ENDED } = CAMPAIGN_CONSTANTS;
type typeStatus = typeof STATUS_ALL | typeof STATUS_ACTIVE | typeof STATUS_ENDED;

export interface ICampaignItemBase {
  adType: string;
  title: string;
  budget: number;
  status: typeStatus;
  startDate: string;
  endDate: string | null;
  report: {
    cost: number;
    convValue: number;
    roas: number;
  };
}

export interface ICampaignItem extends ICampaignItemBase {
  id: number;
}

export type ICampaignItems = ICampaignItem[];

export interface ICampaign {
  count: number;
  items: ICampaignItems;
}
