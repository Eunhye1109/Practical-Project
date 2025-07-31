import React from 'react'
import styled from '@emotion/styled';

interface Props {
    readonly width: string;
    readonly color: string;
    readonly margin?: string;
    readonly opacity?: string;
    readonly thickness?: string;
}

const Content = styled.div<Props>`
  width: ${({width}) => width};
  height: ${({thickness}) => thickness ?? '1px'};
  background-color: ${({color}) => color};
  margin-bottom: ${({margin}) => margin};
  opacity: ${({opacity}) => opacity};
`;

const Line = ({width, color, margin, opacity, thickness}: Props) => {
  return (
    <Content width={width} color={color} opacity={opacity} margin={margin} thickness={thickness} />
  )
}

export default Line