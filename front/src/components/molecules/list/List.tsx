import React from 'react'
import styled from '@emotion/styled'
import { ListItem, ListHeader, Line, Button } from 'components/atoms'
import { useTheme } from '@emotion/react';
import { typoStyle } from 'styles/typoStyle';

interface Props {
    readonly headerList: Array<{label: string, width: string}>;
    readonly allItemList: Array<{name: string, src: string, itemList: Array<{type: string, data: string[]}>}>;
    readonly widthList: string[];
    readonly onClick?: (value: React.ReactNode) => void;
    readonly btnOnClick?: (value: React.ReactNode) => void;
    readonly nullBtnOnClick?: () => void;
    readonly btnLabel?: string;
    readonly notiLabel?: string;
}

const Container = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    flex-direction: column;
`;

const NullContent = styled.div`
    // 크기
    width: 100%;
    height: 27vh;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const NotiText = styled.p`
    ${({theme}) => typoStyle.body.regular(theme)};
    color: ${({theme}) => theme.colors.natural[70]};
`;

const List = ({headerList, allItemList, onClick, btnOnClick, nullBtnOnClick, widthList, btnLabel, notiLabel}: Props) => {
    const theme = useTheme();
  return (
    <Container onClick={() => onClick}>
        <ListHeader headerList={headerList} />
        <Line width='100%' color={theme.colors.natural[20]} />
        {allItemList.length === 0 || allItemList === null || allItemList === undefined ?
        <NullContent>
            <NotiText>{notiLabel}</NotiText>
            <Button label={btnLabel ?? ''} variant='default' size='sm' onClick={nullBtnOnClick} />
        </NullContent>
        :
        allItemList.map((itemList, index) => (
            <React.Fragment>
            <ListItem src={itemList.src} name={itemList.name} itemList={itemList.itemList} onClick={itemList.itemList.some((item) => item.type === 'btn') ? () => btnOnClick : undefined} widthList={widthList} />
            {index !== allItemList.length - 1 && (
                <Line width="100%" color={theme.colors.natural[20]} />
            )}
            </React.Fragment>
        ))
        }
    </Container>
  )
}

export default List