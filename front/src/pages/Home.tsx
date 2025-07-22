import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import bg from '../assets/images/background02.jpg';
import { SearchInput } from 'components/molecules';

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Container>
      <SearchInput width='50%' height='60px' label='기업명을 입력해주세요.' />
    </Container>
  )
}

export default Home