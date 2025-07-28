import React, { ReactElement } from 'react'
import styled from '@emotion/styled'
import { IconButton } from 'components/atoms'
import { DropDown } from 'assets/icons'
import { typoStyle } from 'styles/typoStyle';
import { useTheme } from '@emotion/react';

interface Props extends ContainerProps {
    readonly label: string;
    readonly onClick: () => void;
    readonly icon: React.ReactNode;
}

interface ContainerProps {
    readonly borderColor?: string;
}

const Container = styled.div<ContainerProps>`
    // 크기
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    // 디스플레이
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 스타일
    ${({theme}) => typoStyle.subBody.regular(theme)}
    border: 1px solid ${({borderColor}) => borderColor};
    border-radius: 5px;
    background-color: white;
    padding-left: 15px;
    cursor: pointer;

    transition: 0.3s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

const DropdownButton = ({label, onClick, icon = <DropDown />, borderColor}: Props) => {
    const theme = useTheme();

  return (
    <Container onClick={onClick} borderColor={borderColor ?? theme.colors.natural[20]}>
        {label}
        <IconButton icon={icon} color={theme.colors.primary[100]} />
    </Container>
  )
}

export default DropdownButton