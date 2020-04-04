import { ProvincialTrend } from '../types/responses';
import { PROVINCE_EXCLUSION_LIST } from '../constants/locations';

export function getTrendsForCountry(
  trends: ProvincialTrend[],
  country: string
) {
  return trends.filter((trend) => {
    if (trend.country !== country) {
      return false;
    }
    const province = trend.province.toLowerCase();
    return !PROVINCE_EXCLUSION_LIST.some(
      (exclusion) => province.indexOf(exclusion) >= 0
    );
  });
}
