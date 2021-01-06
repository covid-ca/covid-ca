export interface ProvincialTrend {
  province: string;
  country: string;
  data: number[];
  dayOverDay: number[];
}

export enum JHUColumn {
  Province = 0,
  Country = 1,
  Data = 4,
}

export interface AdministeredTrend {
  region: string;
  data: AdministeredDay[];
}

export interface AdministeredDay {
  date: Date;
  incremental: number;
  cumulative: number;
}

export enum UOTColumn {
  Province = 0,
  Date = 1,
  Administered = 2,
  Cumulative = 3,
}

export interface UOTResponseEntry {
  avaccine: string;
  cumulative_avaccine: string;
  date_vaccine_administered: string;
  province: string;
}
