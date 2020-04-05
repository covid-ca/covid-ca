import styled from 'styled-components';
import { brand } from '../constants/color';

export const PageTitle = styled('h1')`
  padding: 4px 0;
  margin: 32px 0;
  text-align: center;
  font-size: 32px;
  border-top: 10px solid ${brand};
  border-bottom: 10px solid ${brand};
`;
