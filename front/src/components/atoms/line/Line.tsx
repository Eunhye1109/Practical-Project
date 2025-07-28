import React from 'react'
import styled from '@emotion/styled';

interface Props {
    readonly width: string;
    readonly color: string;
    readonly margin?: string;
}

const Content = styled.div<Props>`
  width: ${({width}) => width};
  height: 1px;
  background-color: ${({color}) => color};
  margin-bottom: ${({margin}) => margin};
`;

const Line = ({width, color, margin}: Props) => {
  return (
    <Content width={width} color={color} margin={margin} />
  )
}

export default Line