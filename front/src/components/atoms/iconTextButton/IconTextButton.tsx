import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';

interface Props {
    readonly label: string;
    readonly onClick?: () => void;
    readonly icon: React.ReactNode;
}

const Container = styled.div`
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 5px 10px;
    gap: 5px;
    // 스타일
    background-color: white;
    border-radius: 5px;
    border: 1px solid ${({theme}) => theme.colors.natural[20]};

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const Icon = styled.div`
    // 크기
    width: 20px;
    height: 20px;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    // 스타일
    color: ${({theme}) => theme.colors.natural[40]};
    background-color: transparent;
`;

const Label = styled.span`
    ${({theme}) => typoStyle.caption.light(theme)}
    color: ${({theme}) => theme.colors.natural[40]};
`;

const IconTextButton = ({label, onClick, icon}: Props) => {
  return (
    <Container onClick={onClick}>
        <Icon>{icon}</Icon>
        <Label>{label}</Label>
    </Container>
  )
}

export default IconTextButton