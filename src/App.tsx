import React from 'react';
import styled from 'styled-components';
import { background } from './constants/color';

const AppBackground = styled('div')`
  background-color: ${background};
  min-height: 100vh;
`;

function App() {
  return <AppBackground>Covid</AppBackground>;
}

export default App;
