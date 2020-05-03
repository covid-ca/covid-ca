import React, { useEffect, useRef, useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ProvincialTrend } from '../types/responses';

const DEFAULT_WIDTH = 500;

interface GraphDatum {
  date: string;
  daily: number;
  rollingAverage?: number;
}

interface HighLevelProps {
  trend: ProvincialTrend;
}

function constructGraphData(trend: ProvincialTrend): GraphDatum[] {
  const data: GraphDatum[] = [];
  if (!trend || trend.dayOverDay.length < 5) {
    return data;
  }
  const sourceData = trend.dayOverDay.slice(-55);

  let runningSum =
    sourceData[0] +
    sourceData[1] +
    sourceData[2] +
    sourceData[3] +
    sourceData[4];

  data.push({
    daily: sourceData[0],
    date: '',
    rollingAverage: undefined,
  });
  data.push({
    daily: sourceData[1],
    date: '',
    rollingAverage: undefined,
  });
  data.push({
    daily: sourceData[2],
    date: '',
    rollingAverage: runningSum / 5,
  });

  for (let i = 3; i < sourceData.length - 2; i++) {
    runningSum += sourceData[i + 2] - sourceData[i - 3];
    data.push({
      daily: sourceData[i],
      date: '',
      rollingAverage: runningSum / 5,
    });
  }

  data.push({
    daily: sourceData[sourceData.length - 2],
    date: '',
    rollingAverage: undefined,
  });
  data.push({
    daily: sourceData[sourceData.length - 1],
    date: '',
    rollingAverage: undefined,
  });

  return data;
}

export const HighLevel: React.FunctionComponent<HighLevelProps> = (props) => {
  const [data, setData] = useState<GraphDatum[]>([]);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    setData(constructGraphData(props.trend));
  }, [props.trend]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current?.offsetWidth || DEFAULT_WIDTH);
    };

    if (ref.current) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <ComposedChart
        width={width}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="daily" barSize={20} fill="#413ea0" />
        <Line type="basis" dataKey="rollingAverage" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};
