import React from 'react'
import { Input, IconButton } from '../../atoms'
import { theme } from 'styles/theme';

interface Props {
  readonly width: string;
  readonly label?: string;
  readonly icon: React.ReactNode;
  readonly onClick?: () => void;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly align?: string;
  readonly value?: string;
}

const SearchInput = ({width, label, icon, onClick, align, onChange, value}: Props) => {
  return (
    <Input width={width} label={label} button={<IconButton onClick={onClick} icon={icon} color={theme.colors.primary[100]} />} align={align ?? 'center'} onChange={onChange} value={value}  />
  )
}

export default SearchInput