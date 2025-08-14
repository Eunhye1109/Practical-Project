import { useTheme } from '@emotion/react';
import React from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
    data: {subject: string, A: number, B: number, fullMark: number}[];
    corpName: string;
}

const RadarGraph = ({data, corpName}: Props) => {
    const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <PolarGrid stroke={theme.colors.primary[60]} />
            <PolarAngleAxis
                dataKey="subject"
                fontSize={theme.typo.caption2Regular.fontSize}
            />
            <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                fontSize={theme.typo.caption2Regular.fontSize}
            />
            <Radar
                name="업계 평균"
                dataKey="B"
                stroke={theme.colors.primary[40]}
                fill={theme.colors.primary[40]}
                fillOpacity={0.5}
            />
            <Radar
                name={corpName}
                dataKey="A"
                stroke={theme.colors.primary[100]}
                fill={theme.colors.primary[100]}
                fillOpacity={0.4}
            />
            <Legend
                wrapperStyle={{fontSize: 14}}
                formatter={(value) => <span style={{ color: theme.colors.natural[50] }}>{value}</span>}
            />
        </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarGraph