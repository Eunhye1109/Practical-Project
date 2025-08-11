import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { useState } from 'react';
import { CheckBoxOutline, CheckBox, RadioButtonUnchecked, RadioButtonChecked } from 'assets/icons';

interface Props extends StyleProps {
  readonly label: string;
  readonly mode: 'checkBox' | 'radio';
  readonly selected: boolean;
  readonly onSelect: (label: string) => void;
}

interface StyleProps {
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
  padding: 0 15px;
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

const Icon = styled.div<StyleProps>`
  // 크기
  width: 30px;
  height: 30px;
  // 디스플레이
  display: flex;
  justify-content: start;
  align-items: center;
  // 스타일
  color: ${({color}) => color};
  background-color: transparent;
`;

const Label = styled.div`
    flex: 1;
    // 텍스트 관리
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const DropdownItem = ({label, color, mode, selected, onSelect}: Props) => {
  // const [selected, setSelected] = useState(false);
  // const toggle = () => {
  //   if(selected) {
  //     setSelected(!selected);
  //   } else {
  //     setSelected(!selected)
  //   }
  // }
  const icon = () => {
    switch(mode) {
      case 'radio':
        return selected ? <RadioButtonChecked /> : <RadioButtonUnchecked />;
      case 'checkBox':
        return selected ? <CheckBox /> : <CheckBoxOutline />;
    }
  }

  return (
      <Container onClick={() => onSelect(label)}>
        <Icon color={color}>{icon()}</Icon>
        <Label>{label}</Label>
      </Container>
  )
}

export default DropdownItem