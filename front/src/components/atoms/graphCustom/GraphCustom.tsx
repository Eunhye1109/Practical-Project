import React from 'react';
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';

const Container = styled.ul`
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 50px;
    // 스타일
    list-style: none;
`;

const Content = styled.li`
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    // 스타일
    ${({theme}) => typoStyle.subCaption.light(theme)}
    color: ${({theme}) => theme.colors.natural[50]};
`;

const renderSymbol = (type: string, color: string) => {
  switch (type) {
    case 'rect':
      return <rect x="0" y="0" width="16" height="16" fill={color} />;
    case 'line':
      return <>
                <line x1="0" y1="8" x2="16" y2="8" stroke={color} strokeWidth={2} />
                <circle cx="8" cy="8" r="4" fill='#ffffff' stroke={color} strokeWidth={2} />
            </>;
    default:
      return <circle cx="6" cy="6" r="6" fill={color} />;
  }
};


export const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <Container>
      {payload?.map((entry: any, index: number) => (
        <Content key={`item-${index}`}>
          <svg width={16} height={16} style={{ marginRight: 6 }}>
            {renderSymbol(entry.type, entry.color)}
          </svg>
          {entry.value}
        </Content>
      ))}
    </Container>
  );
};

export const dataFormat = (value: number): string => {
  const absValue = Math.abs(value); // 절댓값 기준으로 단위 계산

  let unit = '';
  let formatted = 0;

  if (absValue >= 1_0000_0000_0000) {
    unit = '조';
    formatted = value / 1_0000_0000_0000;
  } else if (absValue >= 1_0000_0000) {
    unit = '억';
    formatted = value / 1_0000_0000;
  } else if (absValue >= 1_0000) {
    unit = '만';
    formatted = value / 1_0000;
  } else {
    return `${value.toLocaleString()}원`; // 1만 미만은 그대로
  }

  return `${formatted.toFixed(1)}${unit}`;
};

