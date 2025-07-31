import React from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import Dropdown from '../dropdown/Dropdown';

interface Props {
  readonly itemList: string[];
  readonly label: string;
  readonly mode: 'radio' | 'checkBox';
  readonly onChange?: (selectedList: string[]) => void;
  readonly btnLabel?: string;
  readonly selfSelected?: string;
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
  color: ${({theme}) => theme.colors.natural[60]};
`;

const DropdownBox = ({itemList, label, mode, onChange, selfSelected, btnLabel}: Props) => {
  return (
    <Container>
        <DropdownTitle>{label}</DropdownTitle>
        <Dropdown
          itemList={itemList}
          width='100%'
          mode={mode}
          onChange={onChange}
          selfSelected={selfSelected}
          btnLabel={btnLabel}
        />
    </Container>
  )
}

export default DropdownBox