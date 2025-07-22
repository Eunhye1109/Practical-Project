import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import bg from '../assets/images/background02.jpg';

const TSt01 = styled.p`
  ${({theme}) => typoStyle.subTitle.bold(theme)}
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-image:
    ${({theme}) => theme.colors.gradient.crossOpacity},
    url(${bg});
  background-size: cover;
  background-position: center;
`;

const Home = () => {
  return (
    <Container>
      <TSt01>title1Bold</TSt01>
    </Container>
  )
}

export default Home