import React from 'react'
import styled from '@emotion/styled'
import Dropdown from '../dropdown/Dropdown'
import SearchInput from '../searchInput/SearchInput'
import { Search } from 'assets/icons'

type mode = 'radio' | 'checkBox';

interface Props {
    readonly itemList: string[][];
    readonly modeList: mode[];
    readonly label: string;
    readonly onClick?: () => void;
    readonly width?: string;
    readonly value?: string;
}

const Container = styled.div<{width?: string}>`
    // 크기
    width: ${({width}) => width ?? '100%'};
    // 디스플레이
    display: flex;
    gap: 5px;
`;

const SearchBar = ({itemList, modeList, label, onClick, width, value}: Props) => {
  return (
    <Container width={width}>
        {itemList.map((item, index) => (
            <Dropdown
                itemList={item}
                width='20%'
                mode={modeList[index]}
                key={index}
            />
        ))}
        <SearchInput
            width={`${100 - 15 * itemList.length}%`}
            label={label}
            icon={<Search />}
            onClick={onClick}
            align='left'
            value={value}
        />
    </Container>
  )
}

export default SearchBar