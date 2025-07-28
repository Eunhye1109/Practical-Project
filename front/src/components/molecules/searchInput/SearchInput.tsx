import React from 'react'
import { Input, IconButton } from '../../atoms'
import { theme } from 'styles/theme';

interface Props {
  readonly width: string;
  readonly label?: string;
  readonly icon: React.ReactNode;
  readonly onClick?: () => void;
}

const SearchInput = ({width, label, icon, onClick}: Props) => {
  return (
    <Input width={width} label={label} button={<IconButton onClick={onClick} icon={icon} color={theme.colors.primary[100]} />} align='center'  />
  )
}

export default SearchInput