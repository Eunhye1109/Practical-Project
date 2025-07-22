import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react';

interface Props {
    readonly width: string;
    readonly height: string;
    readonly label?: string;
    readonly button?: React.ReactNode;
    readonly focusing?: boolean;
}

const Container = styled.div<Props>`
    width: ${({width}) => width};
    height: ${({height}) => height};
    border: 1px solid ${({focusing, theme}) => focusing ? theme.colors.primary[100] : theme.colors.natural[20]};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 15px;
    overflow: hidden;
    background-color: white;
`;

const InputBar = styled.input`
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 18px;
    text-align: center;
    padding-left: 15px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        text-align: center;
        color: ${({theme}) => theme.colors.natural[30]};
    }
`;

const Input = ({width, height, label, button}: Props) => {
    const [focusing, setFocusing] = useState(false);

  return (
    // 내부 값 바꾸기
    <Container width={width} height={height} focusing={focusing}>
        <InputBar placeholder={label} onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)} />
        {button}
    </Container>
  )
}

export default Input