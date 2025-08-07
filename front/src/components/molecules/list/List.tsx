import React from 'react'
import styled from '@emotion/styled'
import { ListItem, ListHeader, Line, Button } from 'components/atoms'
import { useTheme } from '@emotion/react';
import { typoStyle } from 'styles/typoStyle';
import { SearchListDTO } from 'types/search.types';

interface Props {
    readonly headerList: Array<{label: string, width: string}>;
    readonly dataList: string[][];
    readonly widthList: string[];
    readonly onClick?: (value: React.ReactNode) => void;
    readonly btnOnClick?: (value: React.ReactNode) => void;
    readonly nullBtnOnClick?: () => void;
    readonly btnLabel?: string;
    readonly notiLabel?: string;
    readonly typeList: string[];
    readonly logoList: string[];
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

const List = ({headerList, dataList, onClick, btnOnClick, nullBtnOnClick, widthList, btnLabel, notiLabel, typeList, logoList}: Props) => {
    const theme = useTheme();
  return (
    <Container onClick={() => onClick}>
        <ListHeader headerList={headerList} />
        <Line width='100%' color={theme.colors.natural[20]} />
        {dataList.length === 0 || dataList === null || dataList === undefined ?
        <NullContent>
            <NotiText>{notiLabel}</NotiText>
            <Button label={btnLabel ?? ''} variant='default' size='sm' onClick={nullBtnOnClick} />
        </NullContent>
        :
        dataList.map((item, index) => (
            <React.Fragment>
            <ListItem
                logo={logoList[index]}
                data={item}
                onClick={typeList[index]  === 'btn' ? () => btnOnClick : undefined}
                widthList={widthList}
                typeList={typeList}
            />
            {index !== dataList.length - 1 && (
                <Line width="100%" color={theme.colors.natural[20]} />
            )}
            </React.Fragment>
        ))
        }
    </Container>
  )
}

export default List