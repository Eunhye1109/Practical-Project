import React from 'react'
import styled from '@emotion/styled'
import { WarningText, Input } from 'components/atoms'
import { typoStyle } from 'styles/typoStyle';

interface Props {
    readonly width: string;
    readonly height: string;
    readonly inputLabel: string;
    readonly inputTitleLabel: string;
    readonly textLabel: string;
    readonly visible: boolean;
    readonly type?: string;
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly onBlur?: () => void;
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

const InputContent = styled.div`
  // 크기 세팅
  width: 100%;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 5px;
`;

const InputTitle = styled.p`
  ${({theme}) => typoStyle.caption.regular(theme)}
`;

const InputBox = ({width, height, inputLabel, inputTitleLabel, textLabel, visible, type, onChange, onBlur}: Props) => {
  return (
    <Container>
        <InputTitle>{inputTitleLabel}</InputTitle>
        <InputContent>
          <Input width={width} height={height} label={inputLabel} type={type} onChange={onChange} onBlur={onBlur} align='left' />
          <WarningText label={textLabel} visible={visible} />
        </InputContent>
    </Container>
  )
}

export default InputBox