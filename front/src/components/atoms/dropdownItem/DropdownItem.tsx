import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import IconButton from '../iconButton/IconButton';
import { DropdownProvider } from 'contexts/DropdownContext';
import { CheckBoxOutline, CheckBox, RadioButtonUnchecked, RadioButtonChecked } from 'assets/icons';

interface Props {
    readonly label: string;
    readonly onClick: (value: string) => void;
    readonly icon: React.ReactNode;
    readonly color: string;
}

const Container = styled.div`
    // 크기
    width: 100%;
    min-height: 50px;
    // 스타일
    border: none;
    background-color: white;
    ${({theme}) => typoStyle.subBody.regular(theme)};
    color: ${({theme}) => theme.colors.natural[50]};
    text-align: left;
    box-sizing: border-box;
    padding-left: 20px;
    cursor: pointer;
    // 디스플레이
    display: flex;
    align-items: center;
    gap: 5px;

    transition: 0.2s ease-in-out;
    
    &:hover {
      color: ${({theme}) => theme.colors.natural[100]};
      background-color: ${({theme}) => theme.colors.natural[5]};
    }
`;

const DropdownItem = ({label, onClick, icon, color}: Props) => {

  return (
    <DropdownProvider mode={'radio'} defaultSelected={[]}>
      <Container onClick={() => onClick(label)}>
        <IconButton icon={icon} color={color} />
        {label}
      </Container>
    </DropdownProvider>
  )
}

export default DropdownItem