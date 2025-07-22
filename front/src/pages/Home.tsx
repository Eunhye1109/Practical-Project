import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';

const TSt01 = styled.p`
  ${({theme}) => typoStyle.subTitle.bold(theme)}
`;

const Test = styled.div`
  background: ${({theme}) => theme.colors.gradient.cross};
  width: 100%;
  height: 700px;
`;



const Home = () => {
  return (
    <Test>
      <TSt01>title1Bold</TSt01>
    </Test>
  )
}

export default Home