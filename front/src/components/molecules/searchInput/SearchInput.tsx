import React from 'react'
import { Input, SearchButton } from '../../atoms'

interface Props {
  readonly width: string;
  readonly height: string;
  readonly label?: string;
}

const SearchInput = ({width, height, label}: Props) => {
  return (
    <Input width={width} height={height} label={label} button={<SearchButton />}  />
  )
}

export default SearchInput