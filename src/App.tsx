import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { background } from './constants/color';
import { getConfirmedData } from './data/JHU';
import { ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';
import { Card } from './components/Card';
import { getTrendsForCountry } from './utils/filters';

const AppBackground = styled('div')`
  background-color: ${background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export function App() {
  const [trends, setTrends] = useState<ProvincialTrend[]>([]);

  useEffect(() => {
    getConfirmedData().then((allTrends) => {
      setTrends(getTrendsForCountry(allTrends, 'Canada'));
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppBackground>
        <Card title="Data Points">
          {trends.map((trend) => (
            <p>{trend.province}</p>
          ))}
        </Card>
      </AppBackground>
    </>
  );
}
