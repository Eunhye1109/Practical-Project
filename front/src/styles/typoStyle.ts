import { css } from "@emotion/react";
import { AppTheme } from "./theme";

export const body1 = (theme: AppTheme) => css`
    font-size: ${theme.typo.body1.fontSize};
    font-weight: ${theme.typo.body1.fontWeight};
`;