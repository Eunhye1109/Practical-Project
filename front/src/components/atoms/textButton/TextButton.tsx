import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { css, Theme } from '@emotion/react';
import { Check } from 'assets/icons';

interface Props {
    readonly label: string;
    readonly onClick?: (value: React.ReactNode) => void;
    readonly mode: string;
}

const buttonStyle = (mode: string) => (props: {theme: Theme}) =>  {
    switch(mode) {
        case 'selected':
            return css`
                ${typoStyle.caption.regular(props.theme)};
                color: ${props.theme.colors.natural[100]};
            `;
        case 'default':
            return css`
                ${typoStyle.caption.light(props.theme)};
                color: ${props.theme.colors.natural[60]};
            `;
    }
}

const Content = styled.span<{mode: string}>`
    // 디스플레이
    display: flex;
    align-items: center;

    cursor: pointer;
    ${({theme, mode}) => buttonStyle(mode)({theme})};

    &:hover {
        opacity: 0.8;
    }
`;

const TextButton = ({label, onClick, mode}: Props) => {
  return (
    <Content onClick={() => onClick?.(mode)} mode={mode}>
        <Check width='20px' opacity={mode === 'selected' ? '1' : '0'} />
        {label}
    </Content>
  )
}

export default TextButton