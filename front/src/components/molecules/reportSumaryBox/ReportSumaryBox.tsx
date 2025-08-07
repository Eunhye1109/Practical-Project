import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { Help, ThumbDown, ThumbUp } from 'assets/icons';
import { theme } from 'styles/theme';
import { Tooltip } from 'react-tooltip';
import { Line } from 'components/atoms';
import RadarGraph from 'components/atoms/radarGraph/RadarGraph';
import { useTheme } from '@emotion/react';

interface Props {
    data: {subject: string, A: number, B: number, fullMark: number}[];
    cropName: string;
    aiSumaryData: {emotion: string, sumary: string}[];
    similarCorpData: {corpName: string, logo: string, probability: string, basis: string}[]
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

const SumaryBox = styled.div`
    width: 100%;
    max-height: calc(50% - 5px);
    // 디스플레이
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 15px;
    flex-wrap: wrap;
    gap: 10px;
    // 스타일
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    border: 1px solid white;
`;

const BodyText = styled.p<{align: boolean}>`
    ${({theme}) => typoStyle.caption.light(theme)}
    color: ${({theme}) => theme.colors.natural[70]};
    text-align: ${({align}) => align ? 'center' : 'left'};
    line-height: 1.4rem;
`;

const EmotionBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5x;
`;

const EmotionTitle = styled.span<{color: string}>`
    padding-top: 3px;
    ${({theme}) => typoStyle.caption.regular(theme)}
    color: ${({color}) => color};
`;

const SimilarTextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2px;
`;

const Logo = styled.img`
  // 크기
  width: 70px;
  height: 70px;
  // 스타일
  border-radius: 50%;
`;

const SimilarBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ReportSumaryBox = ({data, cropName, aiSumaryData, similarCorpData}: Props) => {
    const theme = useTheme();
  return (
    <Container>
        {/* 종합 재무지표 분석: radar 차트 */}
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>종합 재무지표 분석</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id00' width={20} />
                    <Tooltip id='id00'>해당 지표 근거 ~~~</Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.primary[80]} margin='0' />
            <RadarGraph data={data} corpName={cropName}  />
        </Content>

        {/* AI 분석 요약 */}
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>AI 기업 분석 요약</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id00' width={20} />
                    <Tooltip id='id00'>해당 지표 근거 ~~~</Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.primary[80]} margin='20px' />
            <SumaryContent>
                {aiSumaryData.map((item) => (
                    <SumaryBox>
                        <EmotionBox>
                            {item.emotion === '긍정' ? <ThumbUp width={40} color={theme.colors.primary[100]} /> : <ThumbDown width={40} color={theme.colors.primaryBlue[100]} />}
                            {item.emotion === '긍정' ? <EmotionTitle color={theme.colors.primary[100]}>긍정적인 분석</ EmotionTitle> : <EmotionTitle color={theme.colors.primaryBlue[100]}>부정적인 분석</ EmotionTitle>}
                        </EmotionBox>
                        <BodyText align={true}>{item.sumary}</BodyText>
                    </SumaryBox>
                ))}
            </SumaryContent>
        </Content>

        {/* 유사 상장사? */}
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>유사 상장사</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id00' width={20} />
                    <Tooltip id='id00'>해당 지표 근거 ~~~</Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.primary[80]} margin='20px' />
            <SumaryContent>
                {similarCorpData.map((item) => (
                    <SimilarBox>
                        <Logo src={item.logo} />
                        <SimilarTextBox>
                            <EmotionTitle color={theme.colors.natural[80]}>{item.corpName} | 유사도 {item.probability}</EmotionTitle>
                            <BodyText align={false}>{item.basis}</BodyText>
                        </SimilarTextBox>
                    </SimilarBox>
                ))}
            </SumaryContent>
        </Content>
    </Container>
  )
}

export default ReportSumaryBox