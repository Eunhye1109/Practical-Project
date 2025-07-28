import React from 'react'
import styled from '@emotion/styled'
import { DropdownItem } from 'components/atoms'

interface Props {
  readonly itemList: string[];
  readonly onClick: (label: string) => void;
  readonly icon: React.ReactNode;
  readonly color: string;
}

const Container = styled.div`
  // 크기
  width: 100%;
  max-height: 200px;
  // 디스플레이
  display: flex;
  justify-content: start;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  // 스타일
  border: 1px solid ${({theme}) => theme.colors.natural[20]};
  border-radius: 5px;
`;

const DropdownList = ({itemList, onClick, icon, color}: Props) => {
  return (
    <Container>
      {itemList.map((item, index) => (
        <DropdownItem key={index} icon={icon} label={item} onClick={() => onClick(item)} color={color} />
      ))}
    </Container>
  )
}

export default DropdownList