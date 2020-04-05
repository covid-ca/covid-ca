import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { background } from './constants/color';
import { getConfirmedData, getDeathsData } from './data/JHU';
import { ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';
import { Card } from './components/Card';
import { getTrendsForCountry } from './utils/filters';
import { TrendData } from './components/TrendData';

const AppBackground = styled('div')`
  background-color: ${background};
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
        <Card title="Last 30 days (cases)">
          <TrendData trends={confirmedTrends} />
        </Card>
        <Card title="Last 30 days (deaths)">
          <TrendData trends={deathsTrends} />
        </Card>
      </AppBackground>
    </>
  );
}
