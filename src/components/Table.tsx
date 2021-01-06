import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  tr > :not(:first-child) {
    text-align: right;
  }

  tr > :first-child {
    text-align: left;
  }
`;
