import React from 'react'
import styled from '@emotion/styled'

interface Props extends StyleProps {
    readonly onClick?: () => void;
    readonly icon: React.ReactNode;
  }
  
interface StyleProps {
  readonly color: string;
}

const Button = styled.button`
    display: flex;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
`;

const Icon = styled.div<StyleProps>`
    // 크기
    width: 30px;
    height: 30px;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    // 스타일
    color: ${({color}) => color};
    background-color: transparent;
`;

const IconButton = ({onClick, icon, color}: Props) => {
  return (
    <Button onClick={onClick}>
        <Icon color={color}>{icon}</Icon>
    </Button>
  )
}

export default IconButton