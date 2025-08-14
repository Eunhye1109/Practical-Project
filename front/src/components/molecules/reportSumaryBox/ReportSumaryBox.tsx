import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { Help, ThumbDown, ThumbUp } from 'assets/icons';
import { theme } from 'styles/theme';
import { Tooltip } from 'react-tooltip';
import { Line } from 'components/atoms';
import RadarGraph from 'components/atoms/radarGraph/RadarGraph';
import { useTheme } from '@emotion/react';
import siren01 from 'assets/images/etc/siren01.png';
import siren02 from 'assets/images/etc/siren02.png';
import siren03 from 'assets/images/etc/siren03.png';
import { ReportFullData } from 'types/report.types';
import { log } from 'console';

interface Props {
    data: {subject: string, A: number, B: number, fullMark: number}[];
    cropName: string;
    aiSumaryData: {emotion: string, summary: string}[];
    similarCorpData: {corpName: string, logo: string, probability: string, basis: string}[];
    fullData: ReportFullData;
}

const Container = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 20px;
`;

const Content = styled.div`
    width: calc(33.333% - 13.333px);
    aspect-ratio: 1 / 1;
    // 디스플레이
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
    // 스타일
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.primary[80]};
    background-image: ${({theme}) => theme.colors.gradient.crossOpacityHigh};
`;

const TextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 15px;
    color: ${({theme}) => theme.colors.primary[110]};
`;

const TitleBox = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: space-between;
`;

const TitleLabel = styled.span`
    ${({theme}) => typoStyle.bodyTitle.semiBold(theme)}
`;

const SumaryContent = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const RiskContent = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    padding-top: 45%;
`;

const SumaryBox = styled.div`
    width: 100%;
    max-height: calc(50% - 5px);
    // 디스플레이
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 15px;
    flex-wrap: wrap;
    gap: 10px;
`;

const BodyText = styled.p<{align: boolean}>`
    ${({theme}) => typoStyle.caption.light(theme)}
    color: ${({theme}) => theme.colors.natural[70]};
    text-align: ${({align}) => align ? 'center' : 'left'};
    line-height: 1.4rem;
    box-sizing: border-box;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid white;
    border-radius: 5px;
`;

const EmotionTitle = styled.span<{color: string}>`
    ${({theme}) => typoStyle.body.semiBold(theme)}
    color: ${({color}) => color};
`;

const RiskTextBox = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    box-sizing: border-box;
    border: 1px solid white;
    padding: 15px;
    z-index: 2;
`;

const RiskTitleBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

const RiskCaption = styled.p`
    ${({theme}) => typoStyle.caption.regular(theme)}
    color: ${({theme}) => theme.colors.primary[80]};
`;

const RiskBody = styled.p`
    ${({theme}) => typoStyle.caption.light(theme)}
    color: ${({theme}) => theme.colors.natural[80]};
    text-align: center;
`;

const RiskTitle = styled.p`
    ${({theme}) => typoStyle.title.bold(theme)};
    color: ${({theme}) => theme.colors.primary[100]};
`;

const RiskSiren = styled.img`
    width: 80%;
    position: absolute;
    top: -10%;
`;

const ReportSumaryBox = ({data, cropName, aiSumaryData, fullData}: Props) => {
    const theme = useTheme();

    // ai분석 쪼개기
    const splitText = (text: string) => {
        return text.split('다.').filter(s => s.trim() !== '').map(s => s + '다.')
    }

    console.log('스코어 점수 확인', fullData.signalData);
    
  return (
    <Container>
        {/* 종합 재무지표 분석: radar 차트 */}
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>이 회사, 건강검진 결과표</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id00' width={20} />
                    <Tooltip id='id00'>
                        <p><strong>집중 할 내용</strong></p>
                        <p>다른 회사와 비교한 이 회사의 컨디션은?</p>
                        <p><strong>안정성</strong></p>
                        <p>= 100 - (부채비율/3) + (자기자본비율 /2)</p>
                        <p><strong>유동성</strong></p>
                        <p>= min(유동비율 / 2, 100)</p>
                        <p><strong>수익성</strong></p>
                        <p>= (영업이익륳 * 0.6)  + (ROE * 0.4)</p>
                        <p><strong>성장성</strong></p>
                        <p>= (0.3 * 매출성장률 + 0.4 * 영업이익성장률 + 0.3 * 순이익CAGR)</p>
                        <p><strong>인적효율성</strong></p>
                        <p>{`= [ 매출성장률 - {(당년 평균인건비 - 전년 평균인건비) / 전년 평균인건비} ] * 100`}</p>
                    </Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.primary[80]} margin='0' />
            <RadarGraph data={data} corpName={cropName}  />
        </Content>

        {/* AI 분석 요약 */}
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>AI의 한 줄 평</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id01' width={20} />
                    <Tooltip id='id01'>
                        <p><strong>집중 할 내용</strong></p>
                        <p>기업의 최근 데이터를 분석한 AI의 진단 결과는?</p>
                        <p><strong>분석 방법</strong></p>
                        <p>* 보고서 내부 지표들 및 최신 뉴스 이슈들을 토대로 gpt 4, gpt 5 모델이 해석</p>
                    </Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.primary[80]} margin='20px' />
            <SumaryContent>
                {aiSumaryData.map((item) => (
                    <SumaryBox>
                        {item.emotion === '긍정' ? <ThumbUp width={25} height={25} color={theme.colors.primary[100]} /> : <ThumbDown width={25} height={25}  color={theme.colors.primaryBlue[100]} />}
                        {item.emotion === '긍정' ? <EmotionTitle color={theme.colors.primary[100]}>긍정적인 분석</ EmotionTitle> : <EmotionTitle color={theme.colors.primaryBlue[100]}>부정적인 분석</ EmotionTitle>}
                        {splitText(item.summary).map((aiSummary) => (
                            <BodyText align={true}>{aiSummary}</BodyText>
                        ))}
                    </SumaryBox>
                ))}
            </SumaryContent>
        </Content>

        {/* 유사 상장사? */}
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>리스크 신호등</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id02' width={20} />
                    <Tooltip id='id02'>
                        <p><strong>집중 할 내용</strong></p>
                        <p>이 회사의 리스크는 지금 어느 정도일까?</p>
                        <p><strong>1. 평균증감률(아래 AVG_CHANGE)</strong></p>
                        <p>{`{(b-a) + (c-b)}/2`}</p>
                        <p><strong>2. 최근 부채비율(c)</strong></p>
                        <p><strong>등급 규칙</strong></p>
                        <p>{`안전: AVG_CHANGE < 15 AND c < 150`}</p>
                        <p>{`양호: (15 ≤ AVG_CHANGE < 30) OR (150 ≤ c ≤ 200)`}</p>
                        <p>{`주의: AVG_CHANGE ≥ 30 OR c > 200`}</p>
                    </Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.primary[80]} margin='20px' />
            <RiskContent>
                <RiskSiren src={fullData.signalData?.signalScore === '1' ? siren01 : (fullData.signalData?.signalScore === '2' ? siren02 : siren03)} />
                <RiskTextBox>
                    <RiskTitleBox>
                        <RiskCaption>{cropName}의 리스크 신호등은</RiskCaption>
                        <RiskTitle>'{fullData.signalData?.signalScore === '1' ? '안전' : (fullData.signalData?.signalScore === '2' ? '양호' : '위험')}'한 상태</RiskTitle>
                    </RiskTitleBox>
                    <RiskBody>
                        {fullData.signalData?.signalScore === '1' ? '최근 3년간 부채비율 변화폭이 15% 미만이고, 현재 부채비율이 150% 미만인 상태' : (fullData.signalData?.signalScore === '2' ? '변화폭이 연평균 15~30%이거나, 현재 부채비율이 150~200%인 상태' : '변화폭이 연평균 30% 이상으로 크거나, 현재 부채비율이 200% 초과인 상태')}
                    </RiskBody>
                </RiskTextBox>
            </RiskContent>
        </Content>
    </Container>
  )
}
export default ReportSumaryBox