import { css } from "@emotion/react";
import { AppTheme } from "./theme";

export const typoStyle = {
    title: {
        bold: (theme: AppTheme) => css`
            font-size: ${theme.typo.title1Bold.fontSize};
            font-weight: ${theme.typo.title1Bold.fontWeight};
            font-family: ${theme.typo.title1Bold.fontFamily};
        `,
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.title1Bold.fontSize};
            font-weight: ${theme.typo.title1Bold.fontWeight};
            font-family: ${theme.typo.title1Bold.fontFamily};
        `
    },
    subTitle: {
        bold: (theme: AppTheme) => css`
            font-size: ${theme.typo.title2Bold.fontSize};
            font-weight: ${theme.typo.title2Bold.fontWeight};
            font-family: ${theme.typo.title2Bold.fontFamily};
        `,
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.title2Regular.fontSize};
            font-weight: ${theme.typo.title2Regular.fontWeight};
            font-family: ${theme.typo.title2Regular.fontFamily};
        `
    },
    subTitle2: {
        bold: (theme: AppTheme) => css`
            font-size: ${theme.typo.title3Bold.fontSize};
            font-weight: ${theme.typo.title3Bold.fontWeight};
            font-family: ${theme.typo.title3Bold.fontFamily};
        `,
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.title3Regular.fontSize};
            font-weight: ${theme.typo.title3Regular.fontWeight};
            font-family: ${theme.typo.title3Regular.fontFamily};
        `
    },
    bodyTitle: {
        semiBold: (theme: AppTheme) => css`
            font-size: ${theme.typo.bodyTitle1SemiBold.fontSize};
            font-weight: ${theme.typo.bodyTitle1SemiBold.fontWeight};
        `,
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.bodyTitle1Regular.fontSize};
            font-weight: ${theme.typo.bodyTitle1Regular.fontWeight};
        `
    },
    body: {
        semiBold: (theme: AppTheme) => css`
            font-size: ${theme.typo.body1SemiBold.fontSize};
            font-weight: ${theme.typo.body1SemiBold.fontWeight};
        `,
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.body1Regular.fontSize};
            font-weight: ${theme.typo.body1Regular.fontWeight};
        `
    },
    subBody: {
        semiBold: (theme: AppTheme) => css`
            font-size: ${theme.typo.body2SemiBold.fontSize};
            font-weight: ${theme.typo.body2SemiBold.fontWeight};
        `,
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.body2Regular.fontSize};
            font-weight: ${theme.typo.body2Regular.fontWeight};
        `
    },
    caption: {
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.caption1Regular.fontSize};
            font-weight: ${theme.typo.caption1Regular.fontWeight};
        `,
        light: (theme: AppTheme) => css`
            font-size: ${theme.typo.caption1Light.fontSize};
            font-weight: ${theme.typo.caption1Light.fontWeight};
        `
    },
    subCaption: {
        regular: (theme: AppTheme) => css`
            font-size: ${theme.typo.caption2Regular.fontSize};
            font-weight: ${theme.typo.caption2Regular.fontWeight};
        `,
        light: (theme: AppTheme) => css`
            font-size: ${theme.typo.caption2Light.fontSize};
            font-weight: ${theme.typo.caption2Light.fontWeight};
        `
    }
}
