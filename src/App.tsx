import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { background } from './constants/color';
import { getConfirmedData } from './data/JHU';
import { ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';

const AppBackground = styled('div')`
  background-color: ${background};
  min-height: 100vh;
`;

export function App() {
  const [trends, setTrends] = useState<ProvincialTrend[]>([]);

  useEffect(() => {
    getConfirmedData().then(setTrends);
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppBackground>Data points: {trends.length}</AppBackground>
    </>
  );
}
