import React from 'react'
import { Bar, BarChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { CustomLegend, dataFormat } from '../graphCustom/GraphCustom'
import { useTheme } from '@emotion/react';
import { GraphData } from 'types/report.types';

interface Props {
    readonly data: GraphData[];
    readonly graphList: string[];
    readonly unit?: string;
    readonly height?: number;
    readonly size: string;
}

const GroupBarGraph = ({data, graphList, unit, height, size}: Props) => {
    const theme = useTheme();
  return (
    <ResponsiveContainer width='100%' height={height ?? 100}>
        <BarChart data={data} barCategoryGap={20} margin={{top: 0, left: 0, bottom: 0, right: 0}}>
            <CartesianGrid stroke={theme.colors.primary[100]} strokeDasharray={'1 3'} vertical={false} />
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
                    dataKey={item}
                    name={item}
                    radius={[5, 5, 0 , 0]}
                    fill={index === 0 ? theme.colors.primaryGreen[40] : (index === 1 ? theme.colors.primary[40] : (index === 2 ? theme.colors.primaryBlue[40] : theme.colors.natural[50]))}
                    activeBar={{fill: index === 0 ? theme.colors.primaryGreen[60] : (index === 1 ? theme.colors.primary[60] : (index === 2 ? theme.colors.primaryBlue[60] : theme.colors.natural[60]))}}
                />
            ))}
            {size !== 'sm' && <Legend content={<CustomLegend />} verticalAlign="top" />}
        </BarChart>
    </ResponsiveContainer>
  )
}

export default GroupBarGraph