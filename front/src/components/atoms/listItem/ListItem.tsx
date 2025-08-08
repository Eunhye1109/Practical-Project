import React from 'react'
import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react';

interface Props {
    readonly listOnClick?: (e: React.MouseEvent<HTMLDivElement>, corpCode: string) => void;
    readonly btnOnClick?: (e: React.MouseEvent<HTMLDivElement>, corpCode: string) => void;
    readonly widthList: string[];
    readonly data: string[];
    readonly typeList: string[];
    readonly logo: string;
    readonly corpCode: string;
}

const Container = styled.div`
    // 크기
    width: 100%;
    height: 90px;
    // 디스플레이
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 20px;
    cursor: pointer;

    &:hover {
        background-color: ${({theme}) => theme.colors.natural[5]};
    }
`;

const itemStyle = (item: string) => (props: {theme: Theme}) =>  {
    switch(item) {
        case 'text':
            return css`
                // 스타일
                ${props.theme.typo.caption2Light}
                color: ${props.theme.colors.natural[70]};
                // 텍스트 관리
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                `;
        case 'tag':
            return css`
                // 크기
                padding: 4px 8px;
                // 스타일
                ${props.theme.typo.caption2Light}
                color: white;
                background-color: ${props.theme.colors.primary[60]};
                border-radius: 3px;
                // 텍스트 관리
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
        case 'btn':
            return css`
                // 크기
                padding: 4px 8px;
                // 스타일
                ${props.theme.typo.caption2Light}
                color: white;
                background-color: ${props.theme.colors.natural[80]};
                border-radius: 3px;
                z-index: 1000;
                cursor: pointer;

                &:hover {
                    opacity: 0.8;
                }
            `;
    }
}

const ItemContent = styled.span<{width: string}>`
    // 크기
    width: ${({width}) => width};
    // 디스플레이
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
`;

const Item = styled.span<{type: string}>`
    ${({type, theme}) => itemStyle(type)({theme})}
`;

const LogoTitle = styled.div`
    // 크기
    width: 20%;
    // 디스플레이
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
`;

const Logo = styled.img<{src: string}>`
    // 크기
    width: 40px;
    height: 40px;
    // 스타일
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.natural[20]};
    background-color: white;
`;

const Title = styled.p<{thickness: boolean}>`
    ${({thickness, theme}) => thickness ? theme.typo.caption1Regular : theme.typo.caption1Light};
    // 텍스트 관리
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ListItem = ({listOnClick, btnOnClick, widthList, typeList, data, logo, corpCode}: Props) => {
  return (
    <Container key={corpCode} onClick={(e) => listOnClick?.(e, corpCode)}>
        <LogoTitle>
            <Logo src={logo} />
            <div>
                <Title thickness={true}>{data[0]}</Title>
            </div>
        </LogoTitle>
        {widthList.map((item, index) => (
            <ItemContent key={index} width={item}>
                <Item type={typeList[index]} onClick={typeList[index] === 'btn' && btnOnClick ? () => btnOnClick : undefined}>
                    {(!data[index + 1] || data[index + 1].trim?.() === '') ? '-' : data[index + 1]}
                </Item>
            </ItemContent>
        ))}
    </Container>
  )
}

export default ListItem