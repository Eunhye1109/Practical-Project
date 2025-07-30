import React from 'react'
import styled from '@emotion/styled'
import { ListItem, ListHeader, Line } from 'components/atoms'
import { useTheme } from '@emotion/react';

interface Props {
    readonly headerList: Array<{label: string, width: string}>;
    readonly allItemList: Array<{name: string, src: string, itemList: Array<{type: string, data: string[]}>}>;
    readonly widthList: string[];
    readonly onClick?: (value: React.ReactNode) => void;
    readonly btnOnClick?: (value: React.ReactNode) => void;
}

const Container = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    flex-direction: column;
`;

const List = ({headerList, allItemList, onClick, btnOnClick, widthList}: Props) => {
    const theme = useTheme();
  return (
    <Container onClick={() => onClick}>
        <ListHeader headerList={headerList} />
        <Line width='100%' color={theme.colors.natural[20]} />
        {allItemList.map((itemList, index) => (
            <React.Fragment>
            <ListItem src={itemList.src} name={itemList.name} itemList={itemList.itemList} onClick={itemList.itemList.some((item) => item.type === 'btn') ? () => btnOnClick : undefined} widthList={widthList} />
            {index !== allItemList.length - 1 && (
                <Line width="100%" color={theme.colors.natural[20]} />
            )}
            </React.Fragment>
        ))}
    </Container>
  )
}

export default List