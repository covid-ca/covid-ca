import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getConfirmedData, getDeathsData } from './data/JHU';
import { ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';
import { Card } from './components/Card';
import { getTrendsForCountry } from './utils/filters';
import { TrendData, TrendType } from './components/TrendData';
import { PageTitle } from './components/PageTitle';

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
      setConfirmedTrends(getTrendsForCountry(allTrends, 'Canada'));
    });
    getDeathsData().then((allTrends) => {
      setDeathsTrends(getTrendsForCountry(allTrends, 'Canada'));
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppBackground>
        <PageTitle>COVID-19 in Canada</PageTitle>
        <Card title="New cases">
          <TrendData trends={confirmedTrends} trendType={TrendType.New} />
        </Card>
        <Card title="Total deaths">
          <TrendData trends={deathsTrends} trendType={TrendType.Cumulative} />
        </Card>
      </AppBackground>
    </>
  );
}
