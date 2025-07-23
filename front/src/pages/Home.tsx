import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { SearchInput } from 'components/molecules';

import bg from '../assets/images/background06.png';

interface Props {
  readonly bgImg: string;
}

const Container = styled.div`
  // 배경 크기 세팅
  width: 100%;
  height: calc(100vh - 50px);
  // 배경 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 20px;
  // 배경 스타일 세팅
  background-color: ${({theme}) => theme.colors.primary[10]};
`;

const Content = styled.div<Props>`
  // 배경 크기 세팅 
  height: 100%;
  width: calc(100vw - 40px);
  border-radius: 50px;
  // 배경 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 40px;
  gap: 20px;
  // 배경 이미지 세팅
  background-image:
    ${({theme}) => theme.colors.gradient.crossOpacity},
    url(${bg}),
    ${({theme}) => theme.colors.gradient.cross};
  background-size: cover;
  background-position: center;
  // TODO:배경 전환 애니메이션 추가하기
`;

const Title = styled.div`
  // 크기 세팅
  width: 100%;
  // 디스플레이 세팅
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
      <Content bgImg={bg}>
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