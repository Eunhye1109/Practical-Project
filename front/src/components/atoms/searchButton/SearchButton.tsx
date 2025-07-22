import React from 'react'
import { ReactComponent as icon } from '../../../assets/icons/search.svg'
import styled from '@emotion/styled'

interface Props {
    readonly onClick?: () => void;
}

const Button = styled.button`
    display: flex;
    border: none;
    background-color: white;
    cursor: pointer;
    padding: 0;
`;

const Icon = styled(icon)`
    width: 30px;
    height: 30px;
    color: ${({theme}) => theme.colors.primary[100]};
`;

const SearchButton = ({onClick}: Props) => {
    // TODO: 검색 로직 추가하기

  return (
    <Button onClick={onClick}>
        <Icon/>
    </Button>
  )
}

export default SearchButton