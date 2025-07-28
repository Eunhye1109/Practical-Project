import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import DropdownButton from '../dropdownButton/DropdownButton'
import DropdownList from '../dropdownList/DropdownList'
import { DropDown, DropUp } from 'assets/icons'
import { theme } from 'styles/theme'

interface Props extends ContainerProps {
    readonly categoryList: string[];
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly listIcon: React.ReactNode;
    readonly color: string;
}

interface ContainerProps {
    readonly width: string;
}

const Container = styled.div<ContainerProps>`
    // 크기
    width: ${({width}) => width};
    // 디스플레이
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Dropdown = ({width, categoryList, value, onChange, listIcon, color}: Props) => {
    // 아이템 리스트 선택
    const [selectCategory, setSelectCategory] = useState(value || categoryList[0]);
    // 아이템 리스트 컨트롤
    const [open, setOpen] = useState(false);
    // 아이콘 버튼 컨트롤
    const [icon, setIcon] = useState(<DropDown />);

    // 아이템 리스트 컨트롤 함수
    const handleToggleButtonClick = () => {
        setIcon(!open ? <DropUp /> : <DropDown />);
        setOpen(!open);
    }

    useEffect(() => {
        setSelectCategory(value); // 상위로부터 받은 value가 바뀌면 내부 상태도 바꿔줌
    }, [value]);

    // 선택 아이템 변경
    const handleItemClick = (selected: string) => {
        setSelectCategory(selected);
        onChange(selected);
        setOpen(false);
        setIcon(<DropDown />)
    }

  return (
    <Container width={width}>
        <DropdownButton
            label={selectCategory}
            onClick={handleToggleButtonClick}
            icon={icon}
            borderColor={!open ? undefined : theme.colors.primary[100]}
        />
        {open && <DropdownList icon={listIcon} color={color} onClick={handleItemClick} itemList={categoryList} />}
    </Container>
  )
}

export default Dropdown