import React from 'react'
import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react';
import { typoStyle } from 'styles/typoStyle';

interface Props {
    readonly onClick?: (value: React.ReactNode) => void;
    readonly btnOnClick?: (value: React.ReactNode) => void;
    readonly src: string;
    readonly name: string;
    readonly itemList: Array<{type: string, data: string[]}>;
    readonly widthList: string[];
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
                background-color: ${props.theme.colors.primary[50]};
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
                background-color: ${props.theme.colors.natural[100]};
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
    width: 15%;
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

const TitleBox = styled.div`
    // 디스플레이
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Title = styled.p<{thickness: boolean}>`
    ${({thickness, theme}) => thickness ? theme.typo.caption1Regular : theme.typo.caption1Light};
    // 텍스트 관리
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ListItem = ({itemList, onClick, src, name, btnOnClick, widthList}: Props) => {
  return (
    <Container onClick={() => onClick}>
        <LogoTitle>
            <Logo src={src} />
            <div>
                <Title thickness={true}>{name}</Title>
            </div>
        </LogoTitle>
        {itemList.map((item, i) => (
            <ItemContent key={i} width={widthList[i]}>
                {item.data.length > 0 ? item.data.map((data, j) => (
                    <Item key={j} type={item.type} onClick={item.type === 'btn' && btnOnClick ? () => btnOnClick(data) : undefined}>{(!data || data.trim?.() === '') ? '-' : data}</Item>
                )) : <Item type={item.type !== 'text' ? 'text' : item.type}>-</Item>}
            </ItemContent>
        ))}
    </Container>
  )
}

export default ListItem