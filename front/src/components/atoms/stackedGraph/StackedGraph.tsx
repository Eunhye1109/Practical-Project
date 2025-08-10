import React from 'react'
import { Bar, BarChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CustomLegend } from '../graphCustom/GraphCustom';
import { useTheme } from '@emotion/react';
import { dataFormat } from '../graphCustom/GraphCustom';
import { GraphData } from 'types/report.types';

interface Props {
    readonly data: GraphData[];
    readonly graphList: string[];
    readonly unit?: string;
    readonly height?: number;
    readonly size: string;
}

const StackedGraph = ({data, graphList, unit, height, size}: Props) => {
    const theme = useTheme();

  return (
    <ResponsiveContainer width='100%' height={height ?? 100}>
        <BarChart data={data}>
            <CartesianGrid stroke={theme.colors.primary[100]} strokeDasharray={'1 3'} vertical={false} />
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
            cursor={{fill: theme.colors.natural[5]}}
            />
            {graphList.map((item, index) => (
                <Bar
                    stackId='a'
                    dataKey={item}
                    name={item}
                    radius={index === (graphList.length - 1) ? [5, 5, 0 , 0] : [0, 0 , 0, 0]}
                    fill={index === 0 ? theme.colors.primaryGreen[40] : (index === 1 ? theme.colors.primary[40] : (index === 2 ? theme.colors.primaryBlue[40] : theme.colors.natural[80]))}
                    activeBar={{fill: index === 0 ? theme.colors.primaryGreen[60] : (index === 1 ? theme.colors.primary[60] : (index === 2 ? theme.colors.primaryBlue[60] : theme.colors.natural[90]))}}
                />
            ))}
            {size !== 'sm' && <Legend content={<CustomLegend />} verticalAlign="top" />}
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
        </BarChart>
    </ResponsiveContainer>
  )
}

export default StackedGraph