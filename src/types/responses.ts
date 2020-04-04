export interface ProvincialTrend {
  province: string;
  country: string;
  data: number[];
}

export enum JHUColumn {
  Province = 0,
  Country = 1,
  Data = 4
}
