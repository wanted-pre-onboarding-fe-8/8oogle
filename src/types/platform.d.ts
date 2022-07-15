export interface IPlatformItem {
  channel: string;
  date: string;
  imp: number;
  click: number;
  cost: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export type KeyOfIPlatformItem = keyof IPlatformItem;

export type IPlatformItems = IPlatformItem[];

export interface IPlatform {
  items: IPlatformItems;
}
