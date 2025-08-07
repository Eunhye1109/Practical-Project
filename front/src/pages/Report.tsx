import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ReportHeader from 'components/molecules/reportHeader/ReportHeader';
import { reportHeaderDummyData, reportInfoDummyData } from 'constants/reportDummyData';
import { ReportInfoBox, ReportNewsBox, ReportSumaryBox } from 'components/molecules';
import { useLogin } from 'contexts/LoginContext';
import { typoStyle } from 'styles/typoStyle';
import { radarGraphDummyData, aiSumaryDummyData, newsDummyData, similarCorpDummyData } from 'constants/reportDummyData';
import StableTypeGraph from 'components/organism/StableTypeGraph';
// import RegularTypeGraph from 'components/organism/RegularTypeGraph';
// import AttackTypeGraph from 'components/organism/AttackTypeGraph';
// import AdminTypeGraph from 'components/organism/AdminTypeGraph';

interface Props {

}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.primary[20]};

  ::before {
    width: 100%;
    height: 300px;
    background-color: ${({theme}) => theme.colors.primary[20]};
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    z-index: -1;
  }
`;

const Content = styled.div`
  width: 85%;
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  margin-bottom: 100px;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  z-index: 100;
  padding: 20px 0;
  background-color: white;
  position: fixed;
  border-bottom: 1px solid ${({theme}) => theme.colors.natural[20]};
  box-shadow: 0px 5px 10px 0px rgba(150, 150, 150, 0.1);
  top: 0;
`;

const NotiBox = styled.div`
  width: 100%;
  // 디스플레이
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px;
  gap: 5px;
  // 스타일
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.primary[30]};
`;

const BodyText = styled.p`
    ${({theme}) => typoStyle.subBody.semiBold(theme)}
    color: ${({theme}) => theme.colors.primary[100]};
    text-align: center;
    line-height: 1.4rem;
`;

const Report = () => {
  const {user} = useLogin();
  
  return (
    <Container>
      <HeaderContent>
        <ReportHeader imgUrl={reportHeaderDummyData.imgUrl} corpName={reportHeaderDummyData.corpName} corpCategory={reportHeaderDummyData.corpCategory} corpKeyword={reportHeaderDummyData.corpKeyword} />
      </HeaderContent>

      <Content>
        <ReportInfoBox titleLabel='기업 소개' corpSumary={reportInfoDummyData.corpSumary} infoData={reportInfoDummyData.infoData} />

        <ReportSumaryBox data={radarGraphDummyData} cropName={reportHeaderDummyData.corpName} aiSumaryData={aiSumaryDummyData} similarCorpData={similarCorpDummyData} />

        {user?.riskType == '안정형' ? <StableTypeGraph /> : (user?.riskType == '공격형' ? <StableTypeGraph /> : user?.riskType == '관리자형' ? <StableTypeGraph /> : <StableTypeGraph />)}

        <ReportNewsBox newsData={newsDummyData} />
        
        <NotiBox>
          <BodyText>
            본 사이트의 재무정보는 금융감독원 전자공시시스템(DART) 데이터를 가공한 참고용 자료입니다.<br />
            정보의 정확성 및 최신성을 보장하지 않으며, 이로 인한 법적 책임을 지지 않습니다. <br />
            투자 및 의사결정 시 원본 자료와 전문가 검토를 권장합니다.
          </BodyText>
        </NotiBox>
      </Content>
    </Container>
  )
}

export default Report