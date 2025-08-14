import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import Line from '../line/Line';
import { useTheme } from '@emotion/react';

interface Props {
    readonly headerList: Array<{ label: string; width: string }>;
}

const Container = styled.div`
    // 크기
    width: 100%;
    height: 40px;
    // 디스플레이
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    box-sizing: border-box;
    padding: 0 20px;
    // 스타일
    background-color: ${({theme}) => theme.colors.natural[10]};
`;

const HeaderItem = styled.span<{width: string}>`
    // 크기
    width: ${({width}) => width};
    // 스타일
    ${({theme}) => typoStyle.caption.regular(theme)}
    color: ${({theme}) => theme.colors.natural[70]};
`;

const ListHeader = ({headerList}: Props) => {
  return (
    <Container>
        {headerList.map((item, index) => (
            <HeaderItem key={index} width={item.width}>{item.label}</HeaderItem>
        ))}
    </Container>
  )
}

export default ListHeader