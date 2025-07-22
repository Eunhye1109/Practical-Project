import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react';

interface Props {
    readonly width: string;
    readonly label?: string;
    readonly button?: React.ReactNode;
    readonly focusing?: boolean;
}

const Container = styled.div<Props>`
    width: ${({width}) => width};
    height: 40px;
    border: 1px solid ${({focusing, theme}) => focusing ? theme.colors.primary[100] : theme.colors.natural[20]};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    background-color: white;
`;

const InputBar = styled.input`
    border: none;

    &:focus {
        outline: none;
    }
`;

const Input = ({width, label, button}: Props) => {
    const [focusing, setFocusing] = useState(false);

  return (
    // 내부 값 바꾸기
    <Container width={width} focusing={focusing}>
        <InputBar placeholder={label} onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)} />
        {button}
    </Container>
  )
}

export default Input