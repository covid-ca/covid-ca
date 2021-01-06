import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getConfirmedData, getDeathsData } from './data/JHU';
import { AdministeredTrend, ProvincialTrend } from './types/responses';
import { GlobalStyles } from './styles/globals';
import { Card } from './components/Card';
import { getTrendsForCountry } from './utils/filters';
import { TrendData, TrendType } from './components/TrendData';
import { PageTitle } from './components/PageTitle';
import { HighLevel } from './components/HighLevel';
import { appendAggregate } from './utils/transformers';
import { getVaccinesAdministered } from './data/UOT';
import { Vaccinnes } from './components/Vaccines';

const AppBackground = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export function App() {
  const [confirmedTrends, setConfirmedTrends] = useState<ProvincialTrend[]>([]);
  const [deathsTrends, setDeathsTrends] = useState<ProvincialTrend[]>([]);
  const [vaccineTrends, setVaccineTrends] = useState<AdministeredTrend[]>([]);

  useEffect(() => {
    getConfirmedData().then((allTrends) => {
      setConfirmedTrends(
        appendAggregate(getTrendsForCountry(allTrends, 'Canada'), 'Canada')
      );
    });
    getDeathsData().then((allTrends) => {
      setDeathsTrends(
        appendAggregate(getTrendsForCountry(allTrends, 'Canada'), 'Canada')
      );
    });
    getVaccinesAdministered().then((trends) => {
      setVaccineTrends(trends);
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppBackground>
        <PageTitle>COVID-19 in Canada</PageTitle>
        <Card title="Administered">
          <Vaccinnes trends={vaccineTrends} />
        </Card>
        <Card title="New cases / 5 day rolling average">
          <HighLevel trend={confirmedTrends[0]} />
        </Card>
        <Card title="New cases trendline / total cases">
          <TrendData trends={confirmedTrends} trendType={TrendType.New} />
        </Card>
        <Card title="Total deaths trendline / total deaths">
          <TrendData trends={deathsTrends} trendType={TrendType.Cumulative} />
        </Card>
        <p>
          All data provided by{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/CSSEGISandData/COVID-19"
          >
            John Hopkins
          </a>
          .
        </p>
      </AppBackground>
    </>
  );
}
