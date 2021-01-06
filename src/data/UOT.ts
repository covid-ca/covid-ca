import { AdministeredTrend } from '../types/responses';
import { extractVaccinesAdministeredData } from '../utils/transformers';

const BASE_PATH =
  'https://raw.githubusercontent.com/ishaberry/Covid19Canada/master/timeseries_prov/vaccine_administration_timeseries_prov.csv';

export async function getVaccinesAdministered(): Promise<AdministeredTrend[]> {
  const data = await fetch(BASE_PATH);
  const raw = await data.text();
  const trends = await extractVaccinesAdministeredData(raw);
  return trends;
}
