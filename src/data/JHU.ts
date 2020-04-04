import { ProvincialTrend } from '../types/responses';
import { extractProvincialData } from '../utils/transformers';

const BASE_PATH = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_';

const CONFIRMED_PATH = BASE_PATH + 'confirmed_global.csv';

export async function getConfirmedData(): Promise<ProvincialTrend[]> {
  const data = await fetch(CONFIRMED_PATH);
  const raw = await data.text();
  const trends = extractProvincialData(raw);
  console.log(trends);
  return trends;
}
