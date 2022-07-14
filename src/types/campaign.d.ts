export interface ICampaignItem {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: {
    cost: number
    convValue: number
    roas: number
  }
}

export type ICampaginItems = ICampaginItem[]

export interface ICampaign {
  count: number
  items: ICampaginItems
}
