import React from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import Dropdown from '../dropdown/Dropdown';

interface Props {
  readonly categoryList: string[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly label: string;
  readonly listIcon: React.ReactNode;
  readonly color: string;
}

const Container = styled.div`
  // 크기 세팅
  width: 100%;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5px;
`;

const DropdownTitle = styled.p`
  ${({theme}) => typoStyle.caption.regular(theme)}
`;

const DropdownBox = ({categoryList, label, value, onChange, listIcon, color}: Props) => {
  return (
    <Container>
        <DropdownTitle>{label}</DropdownTitle>
        <Dropdown
            categoryList={categoryList}
            value={value}
            onChange={onChange}
            width='100%'
            listIcon={listIcon}
            color={color}
        />
    </Container>
  )
}

export default DropdownBox