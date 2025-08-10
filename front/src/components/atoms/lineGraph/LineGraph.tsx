import React from 'react'
import { Line, LineChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { CustomLegend, dataFormat } from '../graphCustom/GraphCustom';
import { useTheme } from '@emotion/react';
import { GraphData } from 'types/report.types';

interface Props {
    readonly data: GraphData[];
    readonly graphList: string[];
    readonly unit?: string;
    readonly height?: number;
    readonly size: string;
}

const LineGraph = ({data, graphList, unit, height, size}: Props) => {
    const theme = useTheme();
  return (
    <ResponsiveContainer width='100%' height={height ?? 100}>
        <LineChart data={data} style={{overflow: 'visible'}} margin={{top: 10, left: 0, bottom: 0, right: 10}}>
            <CartesianGrid stroke={theme.colors.primary[100]} strokeDasharray={'1 3'} />
            <XAxis
                dataKey='year'
                tickFormatter={(value) => value + '년'}
                tickMargin={5}
                tick={{
                    fontSize: theme.typo.caption2Light.fontSize,
                    fill: theme.colors.natural[50]
                }}
                tickLine={false}
                axisLine={{
                    stroke: theme.colors.primary[80]
                }}
            />
            <YAxis
                tickFormatter={(value) => unit === '원' ? dataFormat(value) : value + '%'}
                tickMargin={5}
                tick={{
                    fontSize: theme.typo.caption2Light.fontSize,
                    fill: theme.colors.natural[50]
                }}
                tickLine={false}
                axisLine={{
                    stroke: theme.colors.primary[80]
                }}
            />
            <Tooltip formatter={(value: number | string) => {
                if(unit === '원') {
                    if(typeof value === 'number') {
                        return dataFormat(value);
                    } else {
                        return value;
                    }
                } else {
                    return value + '%';
                }
            }}
            itemStyle={{color: theme.colors.natural[50]}}
            />
            {graphList.map((item, index) => (
            <Line
                dataKey={item}
                name={item}
                stroke={index === 0 ? theme.colors.primary[100] : (index === 1 ? theme.colors.primaryBlue[100] : (index === 2 ? theme.colors.primaryGreen[100] : theme.colors.natural[80]))}
                strokeWidth={2}
                dot={{r: 4}}
            />
        ))}
        {size !== 'sm' && <Legend content={<CustomLegend />} verticalAlign="top" />}
        </LineChart>
    </ResponsiveContainer>
  )
}

export default LineGraph