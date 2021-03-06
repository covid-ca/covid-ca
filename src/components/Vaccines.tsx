import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AdministeredTrend } from '../types/responses';
import { Table } from './Table';

const DEFAULT_WIDTH = 500;

interface VaccinesProps {
  trends: AdministeredTrend[];
}

function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const Vaccinnes: React.FunctionComponent<VaccinesProps> = (props) => {
  const [region, setRegion] = useState('all of Canada');
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const selectedTrend = useMemo<AdministeredTrend | undefined>(() => {
    return props.trends.find((trend) => trend.region === region);
  }, [props.trends, region]);
  const options = useMemo<string[]>(() => {
    const provinceSet = new Set(props.trends.map((trend) => trend.region));
    return [...provinceSet];
  }, [props.trends]);

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
    <>
      <p>
        Showing daily doses for{' '}
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {options.map((option) => (
            <option label={option} value={option} key={option} />
          ))}
        </select>
      </p>
      <div ref={ref}>
        <ComposedChart
          width={width}
          height={400}
          data={selectedTrend?.data}
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
          <Bar dataKey="incremental" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vaccines Administered</th>
            <th>Cumulative</th>
          </tr>
        </thead>
        <tbody>
          {selectedTrend?.data.map((day, index) => (
            <tr key={index}>
              <td>{formatDate(day.date)}</td>
              <td>{formatNumber(day.incremental)}</td>
              <td>{formatNumber(day.cumulative)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
