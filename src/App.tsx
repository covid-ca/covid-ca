import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { background, graphic, graphicLight } from './constants/color';
import { getConfirmedData } from './data/JHU';
import { ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';
import { Card } from './components/Card';
import { getTrendsForCountry } from './utils/filters';
import Trend from 'react-trend';

const AppBackground = styled('div')`
  background-color: ${background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const DataRow = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProvinceTitle = styled('h3')`
  margin: 0;
  padding: 0;
`;

const Spacer = styled('div')`
  flex: 1;
`;

const Confirmed = styled('p')`
  margin: 0;
  min-width: 50px;
  text-align: end;
  color: ${graphic};
  font-size: 20px;
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
        <Card title="Last 30 days">
          {trends.map((trend) => {
            return (
              <DataRow key={trend.province}>
                <ProvinceTitle>{trend.province}</ProvinceTitle>
                <Spacer />
                <Trend
                  data={trend.data.slice(-30)}
                  height={40}
                  width={100}
                  strokeWidth={2}
                  autoDraw={true}
                  gradient={[graphicLight, graphic]}
                />
                <Confirmed>{trend.data[trend.data.length - 1]}</Confirmed>
              </DataRow>
            );
          })}
        </Card>
      </AppBackground>
    </>
  );
}
