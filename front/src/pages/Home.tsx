import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import bg from '../assets/images/background03.jpg';
import { SearchInput } from 'components/molecules';

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

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const MainText = styled.p`
  ${({theme}) => typoStyle.title.bold(theme)};
  color: white;
`;

const SubText = styled.p`
  ${({theme}) => typoStyle.subBody.regular(theme)};
  color: white;
`;

const Home = () => {
  return (
    <Container>
      <Content>
        <Title>
          <SubText>투자에는 역시 요즘기업 보고서!</SubText>
          <MainText>요즘 제일 잘 나가는 기업은 어디?</MainText>
        </Title>
        <SearchInput width='50%' height='60px' label='기업명을 입력해주세요.' />
      </Content>
    </Container>
  )
}

export default Home