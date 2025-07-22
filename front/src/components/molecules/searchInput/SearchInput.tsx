import React from 'react'
import { Input, SearchButton } from '../../atoms'

interface Props {
  readonly width: string;
  readonly label?: string;
}

const SearchInput = ({width, label}: Props) => {
  return (
    <Input width={width} label={label} button={<SearchButton />}  />
  )
}

export default SearchInput