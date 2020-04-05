import { ProvincialTrend, JHUColumn } from '../types/responses';

export function extractProvincialData(raw: string): ProvincialTrend[] {
  const data: ProvincialTrend[] = [];

  const rows = raw.split('\n');
  // const headerRow = rows[0];

  // skip the header
  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');
    const rawTrend = columns.slice(JHUColumn.Data);
    const trendData = rawTrend.map((entry) => parseInt(entry));

    const dayOverDay = [];
    for (let i = 0; i < trendData.length - 1; i++) {
      dayOverDay.push(trendData[i + 1] - trendData[i]);
    }

    data.push({
      province: columns[JHUColumn.Province],
      country: columns[JHUColumn.Country],
      data: trendData,
      dayOverDay,
    });
  }
  return data;
}
