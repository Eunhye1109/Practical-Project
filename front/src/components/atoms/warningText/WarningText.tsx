import React from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';

interface VisibleProps {
  readonly visible: boolean;
}

interface Props extends VisibleProps {
    readonly label: string;
}

const Text = styled.p<VisibleProps>`
  ${({theme}) => typoStyle.subCaption.regular(theme)};
  color: red;
  opacity: ${({visible}) => visible ? 1 : 0};
  margin: 0;
`;

const WarningText = ({label, visible}: Props) => {
  return (
    <Text visible={visible}>{label}</Text>
  )
}

export default WarningText