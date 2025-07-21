import { css } from "@emotion/react";
import { AppTheme } from "./theme";

export const title1Bold = (theme: AppTheme) => css`
    font-size: ${theme.typo.title1Bold.fontSize};
    font-weight: ${theme.typo.title1Bold.fontWeight};
    font-family: ${theme.typo.title1Bold.fontFamily};
`;

export const title1Regular = (theme: AppTheme) => css`
    font-size: ${theme.typo.title1Regular.fontSize};
    font-weight: ${theme.typo.title1Regular.fontWeight};
    font-family: ${theme.typo.title1Regular.fontFamily};
`;

export const title2Bold = (theme: AppTheme) => css`
    font-size: ${theme.typo.title2Bold.fontSize};
    font-weight: ${theme.typo.title2Bold.fontWeight};
    font-family: ${theme.typo.title2Bold.fontFamily};
`;

export const title2Regular = (theme: AppTheme) => css`
    font-size: ${theme.typo.title2Regular.fontSize};
    font-weight: ${theme.typo.title2Regular.fontWeight};
    font-family: ${theme.typo.title2Regular.fontFamily};
`;

export const body1SemiBold = (theme: AppTheme) => css`
    font-size: ${theme.typo.body1SemiBold.fontSize};
    font-weight: ${theme.typo.body1SemiBold.fontWeight};
`;

export const body1Regular = (theme: AppTheme) => css`
    font-size: ${theme.typo.body1Regular.fontSize};
    font-weight: ${theme.typo.body1Regular.fontWeight};
`;

export const body2SemiBold = (theme: AppTheme) => css`
    font-size: ${theme.typo.body2SemiBold.fontSize};
    font-weight: ${theme.typo.body2SemiBold.fontWeight};
`;

export const body2Regular = (theme: AppTheme) => css`
    font-size: ${theme.typo.body2Regular.fontSize};
    font-weight: ${theme.typo.body2Regular.fontWeight};
`;

export const caption1Regular = (theme: AppTheme) => css`
    font-size: ${theme.typo.caption1Regular.fontSize};
    font-weight: ${theme.typo.caption1Regular.fontWeight};
`;

export const caption1Light = (theme: AppTheme) => css`
    font-size: ${theme.typo.caption1Light.fontSize};
    font-weight: ${theme.typo.caption1Light.fontWeight};
`;

export const caption2Regular = (theme: AppTheme) => css`
    font-size: ${theme.typo.caption2Regular.fontSize};
    font-weight: ${theme.typo.caption2Regular.fontWeight};
`;

export const caption2Light = (theme: AppTheme) => css`
    font-size: ${theme.typo.caption2Light.fontSize};
    font-weight: ${theme.typo.caption2Light.fontWeight};
`;