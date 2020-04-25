import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getConfirmedData, getDeathsData } from './data/JHU';
import { ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';
import { Card } from './components/Card';
import { getTrendsForCountry } from './utils/filters';
import { TrendData, TrendType } from './components/TrendData';
import { PageTitle } from './components/PageTitle';
import { appendAggregate } from './utils/transformers';

const AppBackground = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export function App() {
  const [confirmedTrends, setConfirmedTrends] = useState<ProvincialTrend[]>([]);
  const [deathsTrends, setDeathsTrends] = useState<ProvincialTrend[]>([]);

  useEffect(() => {
    getConfirmedData().then((allTrends) => {
      setConfirmedTrends(
        appendAggregate(getTrendsForCountry(allTrends, 'Canada'), 'Canada')
      );
    });
    getDeathsData().then((allTrends) => {
      setDeathsTrends(
        appendAggregate(getTrendsForCountry(allTrends, 'Canada'), 'Canada')
      );
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppBackground>
        <PageTitle>COVID-19 in Canada</PageTitle>
        <Card title="New cases trendline / total cases">
          <TrendData trends={confirmedTrends} trendType={TrendType.New} />
        </Card>
        <Card title="Total deaths trendline / total deaths">
          <TrendData trends={deathsTrends} trendType={TrendType.Cumulative} />
        </Card>
        <p>
          All data provided by{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/CSSEGISandData/COVID-19"
          >
            John Hopkins
          </a>
          .
        </p>
      </AppBackground>
    </>
  );
}
