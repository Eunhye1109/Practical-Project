import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';

const TSt01 = styled.p`
  ${({theme}) => typoStyle.subTitle.bold(theme)}
`;



const Home = () => {
  return (
    <div>
      <TSt01>title1Bold</TSt01>
    </div>
  )
}

export default Home