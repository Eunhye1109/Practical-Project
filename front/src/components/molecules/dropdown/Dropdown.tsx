import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import DropdownButton from '../dropdownButton/DropdownButton'
import DropdownList from '../dropdownList/DropdownList'
import { DropDown, DropUp } from 'assets/icons'
import { theme } from 'styles/theme'

interface Props extends ContainerProps, ListCarriedProps {
    readonly itemList: string[];
    readonly onChange?: (selectedList: string[]) => void;
}

interface ListCarriedProps {
    readonly mode: 'checkBox' | 'radio';
}

interface ContainerProps {
    readonly width: string;
}

const Container = styled.div<ContainerProps>`
    // 크기
    width: ${({width}) => width};
    min-width: ${({width}) => width};
    max-width: ${({width}) => width};
    // 디스플레이
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 5px;
    position: relative;
`;

const Dropdown = ({width, itemList, mode, onChange}: Props) => {
    // label 변경
    const [label, setLabel] = useState(itemList[0]);
    // 아이템 리스트 컨트롤
    const [open, setOpen] = useState(false);
    // 아이콘 버튼 컨트롤
    const [icon, setIcon] = useState(<DropDown />);
    // 클릭 아웃사이드
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 아이템 리스트 컨트롤 함수
    const handleToggleButtonClick = () => {
        setIcon(!open ? <DropUp /> : <DropDown />);
        setOpen(!open);
    }

    // 라벨 변경
    const handleLabelChange = (selectedList: string[]) => {
        // 라디오 버튼 라벨 변경
        if(mode === 'radio') {
            setLabel(selectedList[0]);
        // 체크박스 라벨 변경
        } else {
            if(selectedList.length === itemList.length) {
                setLabel(itemList[0]);
            } else {
                setLabel(selectedList[0] + ' 외 ' + (selectedList.length - 1) + '개');
            }
        }

        onChange?.(selectedList);
    }

    // 클릭 감지해서 드랍다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
                setIcon(<DropDown />);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <Container ref={dropdownRef} width={width}>
        <DropdownButton
            label={label}
            onClick={handleToggleButtonClick}
            icon={icon}
            borderColor={!open ? undefined : theme.colors.primary[100]}
        />
        <DropdownList
            itemList={itemList}
            mode={mode}
            onChange={handleLabelChange}
            open={open}
        />
    </Container>
  )
}

export default Dropdown