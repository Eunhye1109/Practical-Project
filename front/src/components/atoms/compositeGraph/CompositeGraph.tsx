import React from 'react'
import { useTheme } from '@emotion/react';
import { Line, XAxis, YAxis, Bar, ComposedChart, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import { CustomLegend } from '../graphCustom/GraphCustom';
import { dataFormat } from '../graphCustom/GraphCustom';
import { GraphData } from 'types/search.types';

interface Props {
    readonly data: GraphData[];
    readonly graphList: string[];
    readonly unit?: string;
    readonly height?: number;
    readonly size: string;
}

const CompositeGraph = ({data, graphList, unit, height, size}: Props) => {
    const theme = useTheme();
  return (
    <ResponsiveContainer width='100%' height={height ?? 100}>
        <ComposedChart data={data} margin={{top: 0, left: 0, bottom: 0, right: 0}}>
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
            {size !== 'sm' && <Legend content={<CustomLegend />} verticalAlign="top" />}
            {graphList.map((item, index) => (
                index === 0 ? (
                    <Bar
                        dataKey={item}
                        name={item}
                        radius={[5, 5, 0 , 0]}
                        fill={theme.colors.primaryGreen[40]}
                        activeBar={{fill: theme.colors.primaryGreen[60]}}
                    />
                ) : (
                    <Line
                        dataKey={item}
                        name={item}
                        stroke={index === 1 ? theme.colors.primaryBlue[100] : (index === 2 ? theme.colors.primary[100] : theme.colors.natural[80])}
                        strokeWidth={2}
                        dot={{r: 4}}
                    />
                )
            ))}
            <XAxis
                dataKey='연도'
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
        </ComposedChart>
    </ResponsiveContainer>
  )
}

export default CompositeGraph