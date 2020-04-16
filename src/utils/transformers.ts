import { ProvincialTrend, JHUColumn } from '../types/responses';

export function extractProvincialData(raw: string): ProvincialTrend[] {
  const data: ProvincialTrend[] = [];

  const rows = raw.split('\n');

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

export function appendAggregate(trends: ProvincialTrend[], name: string) {
  const aggregate: ProvincialTrend = {
    country: name,
    province: name,
    data: [],
    dayOverDay: [],
  };

  if (trends.length > 0) {
    for (let i = 0; i < trends[0].data.length; i++) {
      const dailySum = trends.reduce((sum, trend) => sum + trend.data[i], 0);
      aggregate.data.push(dailySum);
    }

    for (let i = 0; i < trends[0].dayOverDay.length; i++) {
      const dailySum = trends.reduce(
        (sum, trend) => sum + trend.dayOverDay[i],
        0
      );
      aggregate.dayOverDay.push(dailySum);
    }
  }

  return [aggregate, ...trends];
}
