// src/components/PdfReport.tsx
import React, { useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import styled from '@emotion/styled';
import bg from 'assets/images/bg/background06.png';
import { typoStyle } from 'styles/typoStyle';
import { ReportFullData } from 'types/report.types';
import logo from 'assets/images/logo/logo_vertical_white.png';
import colorLogo from 'assets/images/logo/logo_vertical.png';
import { Line } from 'components/atoms';
import { useTheme } from '@emotion/react';
import { ReportInfoBox, ReportSumaryBox } from 'components/molecules';
import { reportFullDummyData } from 'constants/reportDummyData';
import { useLogin } from 'contexts/LoginContext';
import StableTypeGraph from './StableTypeGraph';
import AttackTypeGraph from './AttackTypeGraph';
import AdminTypeGraph from './AdminTypeGraph';

interface PdfReportProps {
  data: ReportFullData;
  onComplete?: () => void;
}

const Container = styled.div`
    width: 508mm;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const CoverPage = styled.div<{ isLast?: boolean }>`
    width: 508mm;
    height: 285.75mm;
    // 배경 이미지 세팅
    background-image:
        ${({theme}) => theme.colors.gradient.crossOpacity},
        url(${bg}),
        ${({theme}) => theme.colors.gradient.cross};
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
    padding: 30px;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
    gap: 10px;
`;

const CoverTitleBox = styled.div`
    display: flex;
    gap: 30px;
    padding-bottom: 40px;
`;

const CoverCaption = styled.p`
    color: white;
    ${({theme}) => typoStyle.body.regular(theme)};
    font-size: 35px;
`;

const CoverTitle = styled.span<{thick: boolean}>`
    color: white;
    ${({theme, thick}) => thick ? typoStyle.title.bold(theme) : typoStyle.title.regular(theme)};
    font-size: 100px;
    font-weight: ${({thick}) => thick ? 300 : 200};
`;

const CoverLogo = styled.img`
    width: 200px;
    opacity: 0.8;
    position: absolute;
    bottom: 80px;
`;

const Page = styled.div<{ isLast?: boolean }>`
    width: 508mm;
    height: 285.75mm;
    background-color: ${({theme}) => theme.colors.primary[20]};
    box-sizing: border-box;
    padding: 30px;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
`;

const PageContent = styled.div`
    width: calc(100% - 15mm);
    height: calc(100% - 15mm);
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PageTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-bottom: 40px;
`;

const PageTitle = styled.p`
    color: ${({theme}) => theme.colors.primary[100]};
    ${({theme}) => typoStyle.title.bold(theme)};
    font-size: 60px;
`;

const PageSubTitle = styled.p`
    color: ${({theme}) => theme.colors.primary[100]};
    ${({theme}) => typoStyle.body.regular(theme)};
    font-size: 35px;
`;

const PageBodyContent = styled.div`
    width: 100%;
`;

const PdfReport: React.FC<PdfReportProps> = ({ data, onComplete }) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (pdfRef.current) {
    const element = pdfRef.current;

    const opt = {
      filename: `${data?.corpName || 'report'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        windowWidth: 1920,
        windowHeight: 1080,
      },
      jsPDF: {
        unit: 'mm',
        format: [508, 285.75],
        orientation: 'landscape',
      },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    // 1초 딜레이 후에 PDF 생성 시작
    const timer = setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          if (onComplete) onComplete();
        });
    }, 2000); // 1000ms = 1초

    return () => clearTimeout(timer); // cleanup
  }
}, [data, onComplete]);

  const theme = useTheme();
  const {user} = useLogin();

  return (
    <Container ref={pdfRef}>
        <CoverPage >
            <CoverCaption>이 기업 요즘 어때? 요즘 기업 보고서!</CoverCaption>
            <CoverTitleBox>
                <CoverTitle thick={true}>{data.corpName}</CoverTitle>
                <CoverTitle thick={false}>재무 보고서</CoverTitle>
            </CoverTitleBox>
            <CoverLogo src={logo}></CoverLogo>
        </CoverPage>

        <Page>
            <PageContent>
                <PageTitleBox>
                    <PageTitle>기업 소개</PageTitle>
                    <PageSubTitle>{data.infoBox.corpSummary}</PageSubTitle>
                </PageTitleBox>
                <Line color={theme.colors.primary[40]} width='100%' margin='20px' thickness='2px' />
                <PageBodyContent>
                    <ReportSumaryBox data={data.rader} cropName={data.corpName} aiSumaryData={data.aiSumary} similarCorpData={reportFullDummyData.similarCorp} />
                </PageBodyContent>
            </PageContent>
            <CoverLogo src={colorLogo}></CoverLogo>
        </Page>

        <Page>
            <PageContent>
                <PageTitleBox>
                    <PageTitle>기업 분석</PageTitle>
                    <PageSubTitle>다양한 지표들을 바탕으로 기업의 재무 상태에 대해 이해할 수 있다.</PageSubTitle>
                </PageTitleBox>
                <Line color={theme.colors.primary[40]} width='100%' margin='20px' thickness='2px' />
                <PageBodyContent>
                    {user?.riskType == '안정형' ?
                        <StableTypeGraph data={data} showIndex={[true, false, false]} /> :
                        (user?.riskType == '공격형' ?
                        <AttackTypeGraph data={data} showIndex={[true, false, false]} /> :
                        <AdminTypeGraph data={data} showIndex={[true, false, false]} />)
                    }
                </PageBodyContent>
            </PageContent>
            <CoverLogo src={colorLogo}></CoverLogo>
        </Page>

        <Page>
            <PageContent>
                <PageTitleBox>
                    <PageTitle>기업 분석</PageTitle>
                    <PageSubTitle>다양한 지표들을 바탕으로 기업의 재무 상태에 대해 이해할 수 있다.</PageSubTitle>
                </PageTitleBox>
                <Line color={theme.colors.primary[40]} width='100%' margin='20px' thickness='2px' />
                <PageBodyContent>
                    {user?.riskType == '안정형' ?
                        <StableTypeGraph data={data} showIndex={[false, true, false]} /> :
                        (user?.riskType == '공격형' ?
                        <AttackTypeGraph data={data} showIndex={[false, true, false]} /> :
                        <AdminTypeGraph data={data} showIndex={[false, true, false]} />)
                    }
                </PageBodyContent>
            </PageContent>
            <CoverLogo src={colorLogo}></CoverLogo>
        </Page>

        <Page>
            <PageContent>
                <PageTitleBox>
                    <PageTitle>기업 분석</PageTitle>
                    <PageSubTitle>다양한 지표들을 바탕으로 기업의 재무 상태에 대해 이해할 수 있다.</PageSubTitle>
                </PageTitleBox>
                <Line color={theme.colors.primary[40]} width='100%' margin='20px' thickness='2px' />
                <PageBodyContent>
                    {user?.riskType == '안정형' ?
                        <StableTypeGraph data={data} showIndex={[false, false, true]} /> :
                        (user?.riskType == '공격형' ?
                        <AttackTypeGraph data={data} showIndex={[false, false, true]} /> :
                        <AdminTypeGraph data={data} showIndex={[false, false, true]} />)
                    }
                </PageBodyContent>
            </PageContent>
            <CoverLogo src={colorLogo}></CoverLogo>
        </Page>
        
        <CoverPage >
            <CoverCaption>이 기업 요즘 어때?</CoverCaption>
            <CoverTitleBox>
                <CoverTitle thick={true}>요즘 기업 보고서!</CoverTitle>
            </CoverTitleBox>
            <CoverLogo src={logo}></CoverLogo>
        </CoverPage>
    </Container>
    // <div
    //   ref={pdfRef}
    //   style={{
    //     width: 1920,
    //     height: 1080,
    //     backgroundColor: 'white',
    //     padding: '20px',
    //     boxSizing: 'border-box',
    //     // PDF 출력용 스타일 추가 가능
    //   }}
    // >
    //   <h1>{data?.corpName}</h1>
    //   {/* 필요한 데이터들 출력 */}
    //   <p>{data?.infoBox?.corpSummary}</p>
    //   {/* 추가 데이터 렌더링 */}
    // </div>
  );
};

export default PdfReport;
