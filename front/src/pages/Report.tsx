import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ReportHeader from 'components/molecules/reportHeader/ReportHeader';
import { reportFullDummyData } from 'constants/reportDummyData';
import { ReportInfoBox, ReportNewsBox, ReportSumaryBox } from 'components/molecules';
import { useLogin } from 'contexts/LoginContext';
import { typoStyle } from 'styles/typoStyle';
import StableTypeGraph from 'components/organism/StableTypeGraph';
import { data, useLocation, useNavigate } from 'react-router-dom';
import { deleteCorp, saveCorp } from 'api/mypageApi';
import RegularTypeGraph from 'components/organism/RegularTypeGraph';
import AttackTypeGraph from 'components/organism/AttackTypeGraph';
import AdminTypeGraph from 'components/organism/AdminTypeGraph';
import { useLoading } from 'contexts/LodingContext';
import PdfReport from 'components/organism/PdfReport';

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
  // 데이터 받아오기
  const location = useLocation();
  const navigate = useNavigate();
  const reportData = location.state?.reportData;
  const corpCode = reportData.corpCode;
  const corpName = reportData.corpName;
  const {user} = useLogin();
  // 관심기업 추가되어있는지 안되어있는지
  const [onOff, setOnOff] = useState(false);
  // 로딩
  const {setLabel, setLoading} = useLoading();
  // pdf 만들기
  const [pdfData, setPdfData] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  // 관심기업저장 버튼 클릭
  // TODO: 이미 추가 되었나 안되었나 확인하는 로직 추가 필요 -> 백엔드 완성 후 구현
  const handleSaveClick = async () => {
    if(user?.userId === null || user?.userId === undefined) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      if(onOff) {
        setOnOff(false);
        try {
          const res = deleteCorp(user.userId, corpCode);
          alert('관심기업이 삭제되었습니다.');
        } catch (e) {
          alert('삭제 실패~~~');
        }
      } else {
          if(window.confirm("메모를 추가하시겠습니까?")) {
            const memo = prompt('메모를 입력해주세요.');
            try {
              const res = await saveCorp(user.userId, corpCode, memo ?? '');
              console.log(res);
              alert(corpName + '이 관심기업에 추가되었습니다.');
            } catch (e) {
              alert('메모 포함 저장: 실패');
            }
          } else {
            try {
              const res = await saveCorp(user.userId, corpCode, '');
              console.log(res);
              alert(corpName + '이 관심기업에 추가되었습니다.');
            } catch (e) {
              alert('메모 없이 저장: 실패');
            }
          }
        }
      }
  }

  // 기업공유 버튼 클릭
  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('주소가 복사되었습니다!');
    } catch (e) {
      alert('실패');
    }
  }

  // 리포트생성 버튼 클릭
  const handleReportClick = async () => {
    setLabel('리포트 출력을 준비하는 중입니다...');
    setLoading(true);
    try {
      if (!reportData) {
      alert('보고서 데이터를 불러오세요.');
      return;
    }
      setPdfData(reportData);
      setShowPdf(true);
    } catch (error) {
      alert('리포트 생성에 실패했습니다. 다시 시도해주세요.');
    } 
    
  }

  // PDF 생성 완료 후 호출
  const handlePdfComplete = () => {
    setLoading(false);
    setShowPdf(false); // PDF 컴포넌트 숨기기
  };

  return (
    <Container id='pdf'>
      <HeaderContent>
        <ReportHeader
          logoUrl={reportData?.header?.logoUrl ?? ''}
          corpName={reportData?.corpName ?? '정보 없음'}
          corpCategory={reportData?.header?.major ?? '정보 없음'}
          corpKeyword={reportData?.header?.keyword ?? '정보 없음'}
          saveOnClick={handleSaveClick}
          shareOnClick={handleShareClick}
          reportOnClick={handleReportClick}
          onOff={onOff}
        />
      </HeaderContent>

      <Content>
        <ReportInfoBox titleLabel='기업 소개' corpSumary={reportData?.infoBox?.corpSummary ?? '정보없음'} infoData={reportData?.infoBox?.infoData ?? '정보없음'} />

        <ReportSumaryBox data={reportData.rader} cropName={reportData.corpName} aiSumaryData={reportData.aiSumary} similarCorpData={reportFullDummyData.similarCorp} />

        {user?.riskType == '안정형' ?
        <StableTypeGraph data={reportData} /> :
        (user?.riskType == '공격형' ?
        <AttackTypeGraph data={reportData} /> :
        user?.riskType == '혼합형' ?
        <AdminTypeGraph data={reportData} /> :
        // 비회원
        <RegularTypeGraph data={reportData} />)}
        
        <ReportNewsBox newsData={reportData.newsData} data={reportData.graphData} />
        
        <NotiBox>
          <BodyText>
            본 사이트의 재무정보는 금융감독원 전자공시시스템(DART) 데이터를 가공한 참고용 자료입니다.<br />
            정보의 정확성 및 최신성을 보장하지 않으며, 이로 인한 법적 책임을 지지 않습니다. <br />
            투자 및 의사결정 시 원본 자료와 전문가 검토를 권장합니다.
          </BodyText>
        </NotiBox>
      </Content>

      {showPdf && <PdfReport data={reportData} onComplete={handlePdfComplete} />}
    </Container>
  )
}

export default Report