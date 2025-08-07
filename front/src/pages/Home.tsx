import styled from '@emotion/styled'
import React, { useState } from 'react'
import { typoStyle } from 'styles/typoStyle';
import { SearchInput } from 'components/molecules';
import { Search } from 'assets/icons';
import bg from '../assets/images/bg/background06.png';
import { useNavigate } from 'react-router-dom';
import { searchCorp } from 'api/searchApi';

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
  margin-top: 50px;
  // 배경 스타일 세팅
  background-color: ${({theme}) => theme.colors.primary[20]};
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
  // 검색어
  const [corpName, setCorpName] = useState('');
  // 네비게이션
  const navigate = useNavigate();

  // 검색 실행
  const handleSearchClick = async () => {
    try {
      const searchDataList = await searchCorp(corpName);
      const dataList: any[][] = [];
      const codeList: any[] = [];

      searchDataList.forEach(item => {
        const values = Object.values(item);
        const lastValue = values[values.length - 1];

        dataList.push(values.slice(0, values.length - 1));
        codeList.push(lastValue);
      });
      if(searchDataList[0]) {
        navigate('/searchResult', { state: { res: dataList, code: codeList } });
        console.log(searchDataList);
        console.log(dataList);
        console.log(codeList);
      }
    } catch (e) {
      alert('실패~~~');
    }
  }
  return (
    <Container>
      <Content bgImg={bg}>
        <Title>
          <SubText>투자 할 때는 역시 요즘기업 보고서!</SubText>
          <MainText>요즘 투자하기 좋은 기업은 어디?</MainText>
        </Title>
        <SearchInput
          width='50%'
          label='기업명을 입력해주세요.'
          icon={<Search width='100%' height='100%' />}
          onClick={handleSearchClick}
          onChange={(e) => {setCorpName(e.target.value)}}
        />
      </Content>
    </Container>
  )
}

export default Home