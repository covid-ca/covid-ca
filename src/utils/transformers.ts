import { ProvincialTrend, JHUColumn } from '../types/responses';

export function extractProvincialData(raw: string): ProvincialTrend[] {
  const data: ProvincialTrend[] = [];

  const rows = raw.split('\n');
  // const headerRow = rows[0];

  // skip the header
  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');
    const rawTrend = columns.slice(JHUColumn.Data);
    data.push({
      province: columns[JHUColumn.Province],
      country:  columns[JHUColumn.Country],
      data: rawTrend.map((entry) => parseInt(entry))
    })
  }

  return data;
}