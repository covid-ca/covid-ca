import { createGlobalStyle } from 'styled-components';
import { background } from '../constants/color';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: ${background};
  }

  *, * > * {
    font-family: 'Roboto', sans-serif;
  }
`;
