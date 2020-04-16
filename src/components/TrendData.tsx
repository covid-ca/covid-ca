import React from 'react';
import { ProvincialTrend } from '../types/responses';
import { Row } from './Row';
import { graphic, graphicLight } from '../constants/color';
import Trend from 'react-trend';
import { Spacer } from './Spacer';
import { ProvinceTitle } from './ProvinceTitle';
import { DataLabel } from './DataLabel';

export enum TrendType {
  Cumulative,
  New,
}

interface TrendDataProps {
  trends: ProvincialTrend[];
  trendType: TrendType;
}

export const TrendData: React.FunctionComponent<TrendDataProps> = (props) => {
  const { trends, trendType } = props;
  return (
    <>
      {trends.map((trend) => {
        const trendData =
          trendType === TrendType.Cumulative ? trend.data : trend.dayOverDay;
        return (
          <Row key={trend.province}>
            <ProvinceTitle>{trend.province}</ProvinceTitle>
            <Spacer />
            <Trend
              data={trendData.slice(-30)}
              height={40}
              width={100}
              strokeWidth={2}
              autoDraw={true}
              gradient={[graphicLight, graphic]}
            />
            <DataLabel>{trend.data[trend.data.length - 1]}</DataLabel>
          </Row>
        );
      })}
    </>
  );
};
