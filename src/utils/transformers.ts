import {
  ProvincialTrend,
  JHUColumn,
  AdministeredTrend,
  AdministeredDay,
  UOTResponseEntry,
} from '../types/responses';
import csv from 'csvtojson';

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

export async function extractVaccinesAdministeredData(
  raw: string
): Promise<AdministeredTrend[]> {
  const aggTrend: AdministeredTrend = {
    region: 'all of Canada',
    data: [],
  };

  const data = (await csv().fromString(raw)) as UOTResponseEntry[];

  const dateMap: { [date: string]: AdministeredDay } = {};
  const provincialTrendMap: { [province: string]: AdministeredTrend } = {};
  const provincialTrends: AdministeredTrend[] = [];

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    let day = dateMap[entry.date_vaccine_administered];
    let provincialTrend = provincialTrendMap[entry.province];
    if (!provincialTrend) {
      provincialTrend = {
        region: entry.province,
        data: [],
      };
      provincialTrendMap[entry.province] = provincialTrend;
      provincialTrends.push(provincialTrend);
    }
    if (!day) {
      day = {
        date: getDateFromUOTDate(entry.date_vaccine_administered),
        cumulative: 0,
        incremental: 0,
      };
      dateMap[entry.date_vaccine_administered] = day;
      aggTrend.data.push(day);
    }
    day.cumulative += parseInt(entry.cumulative_avaccine);
    day.incremental += parseInt(entry.avaccine);
    provincialTrend.data.push({
      cumulative: parseInt(entry.cumulative_avaccine),
      date: day.date,
      incremental: parseInt(entry.avaccine),
    });
  }
  return [aggTrend, ...provincialTrends];
}

function getDateFromUOTDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
