import React from 'react';
import styled from 'styled-components';
import { primary } from '../constants/color';

interface CardProps {
  title: string;
}

const Wrapper = styled('div')`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 3px solid white;
  width: 100%;
  max-width: 990px;
`;

const Header = styled('h2')`
  background-color: ${primary};
  color: white;
  padding: 8px 16px;
  margin: 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: center;
`;

const Content = styled('div')`
  padding: 8px 16px;
`;

export const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <Wrapper>
      <Header>{props.title}</Header>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};
