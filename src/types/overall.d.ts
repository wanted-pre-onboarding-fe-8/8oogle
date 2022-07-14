export interface IOverallItem {
  imp: number
  click: number
  cost: number
  conv: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
  date: string
}

export type IOverallItems = IOverallItem[]

export interface IOverall {
  items: IOverallItems
}
