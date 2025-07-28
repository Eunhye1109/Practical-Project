import React from 'react'
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Theme } from '@emotion/react';
import { typoStyle } from 'styles/typoStyle';

interface Props extends StyleProps {
    readonly label: string;
    readonly onClick?: () => void;
}

interface StyleProps {
    readonly variant: string;
    readonly size: string;
    readonly margin: string;
}

const variantStyle = (variant: string) => (props: {theme: Theme}) => {
    switch(variant) {
        case 'primary':
            return css`
                background-color: ${props.theme.colors.primary[100]};
                color: white;
                transition: 0.2s ease-in-out;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
            `;
        case 'default':
            return css`
                background-color: ${props.theme.colors.natural[80]};
                color: white;
                transition: 0.2s ease-in-out;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
            `;
        case 'deactive':
            return css`
                background-color: ${props.theme.colors.natural[5]};
                color: ${props.theme.colors.natural[30]};
                `;
        default:
    }
}

const sizeStyle = (size: string) => (props: {theme: Theme}) => {
    switch(size) {
        case 'sm':
            return css`
                width: 20%;
            `;
        case 'md':
            return css`
                width: 40%;
            `;
        case 'lg':
            return css`
                width: 60%;
            `;
        default:
    }
}

const Content = styled.button<StyleProps>`
    // 크기 세팅
    height: 50px;
    // 스타일 세팅
    ${({theme}) => typoStyle.subBody.semiBold(theme)}
    border-radius: 5px;
    border: none;
    margin-bottom: ${({margin}) => margin};
    ${({variant, theme}) => variantStyle(variant)({theme})};
    ${({size, theme}) => sizeStyle(size)({theme})};
`;

const Button = ({variant, size, label, margin, onClick}: Props) => {
  return (
    <Content variant={variant} size={size} margin={margin} onClick={onClick}>{label}</Content>
  )
}

export default Button