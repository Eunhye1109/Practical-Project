import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react';
import { DropdownItem } from 'components/atoms'
import { theme } from 'styles/theme';

interface Props extends CarriedProps, AnimationProps {
  readonly itemList: string[];
  readonly onChange?: (selected: string[]) => void;
}

interface CarriedProps {
  readonly mode: 'checkBox' | 'radio';
}

interface AnimationProps {
  readonly open: boolean;
}

const Container = styled.div<AnimationProps>`
  // 크기
  width: 100%;
  max-height: ${({open}) => open ? '200px' : '0'};
  // 디스플레이
  display: flex;
  justify-content: start;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  // 위치
  position: absolute;
  top: calc(100% + 5px);
  z-index: 100;
  // 스타일
  border: 1px solid ${({theme}) => theme.colors.primary[100]};
  border-radius: 5px;

  // 애니메이션
  transform-origin: top;
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
  transition: 0.3s ease-in-out;
`;

const DropdownList = ({itemList, mode, onChange, open}: Props) => {
  const [selectedList, setSelectedList] = useState<string[]>(mode === 'radio' ? [itemList[0]] : itemList);

  const handleSelect = (label: string) => {
    setSelectedList((prev) => {
      let nextSelected: string[] = [];
      
      // 라디오 버튼인 경우
      if(mode === 'radio') {
        // 선택한 값이 배열에 있는 경우
        if(prev.includes(label)) {
          nextSelected = prev;
        // 선택한 값이 배열에 없는 경우
        } else {
          nextSelected = [label];
        }
      // 체크박스인 경우
      } else {
        // 선택한 값이 전체 선택인 경우
        if(label === itemList[0]) {
          nextSelected = itemList;
        // 선택한 값이 전체 선택이 아닌 경우
        } else {
          // 선택한 값이 배열에 있는 경우
          if(prev.includes(label)) {
            nextSelected = prev.filter((item) => item !== label && item !== itemList[0]);
          } // 선택한 값이 배열에 없는 경우
            else {
            nextSelected = [...prev, label];
          }
        }
      }
      onChange?.(nextSelected);

      return nextSelected;
    })
  }

  return (
    <Container open={open}>
      {itemList.map((item, index) => (
        <DropdownItem
          key={index}
          label={item}
          onSelect={() => handleSelect(item)}
          mode={mode}
          selected={selectedList.includes(item)}
          color={selectedList.includes(item) ? theme.colors.primary[100] : theme.colors.natural[20]}
        />
      ))}
    </Container>
  )
}

export default DropdownList