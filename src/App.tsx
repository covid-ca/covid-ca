import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { background } from './constants/color';
import { getConfirmedData } from './data/JHU';
import { ProvincialTrend } from './types/responses';

const AppBackground = styled('div')`
  background-color: ${background};
  min-height: 100vh;
`;

function App() {
  const [trends, setTrends] = useState<ProvincialTrend[]>([]);

  useEffect(() => {
    getConfirmedData().then(setTrends);
  }, []);

  return <AppBackground>Data points: {trends.length}</AppBackground>;
}

export default App;
