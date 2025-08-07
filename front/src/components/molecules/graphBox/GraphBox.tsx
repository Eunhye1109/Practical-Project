import React from 'react'
import styled from '@emotion/styled'
import { CompositeGraph, StackedGraph, LineGraph, GroupBarGraph, Line } from 'components/atoms';
import { typoStyle } from 'styles/typoStyle';
import { useTheme } from '@emotion/react';
import { Tooltip } from 'react-tooltip';
import { Help } from 'assets/icons';
import BarGraph from 'components/atoms/barGraph/BarGraph';

interface Props {
    readonly type: string; // 'composite' | 'group' | 'line' | 'stack' | 'pie';
    readonly titleLable: string;
    readonly textType: number;
    readonly size: string;
    readonly data: Array<{
        '연도': string; // 연도
        '순이익': number, // 순이익
        '영업이익': number, // 영업이익
        '매출액': number, // 매출액
        '부채총계': number, // 부채총계
        '자본총계': number, // 자본총계
        '유동자산': number, // 유동자산
        '유동부채': number, // 유동부채
        'ROE': number,
        'ROA': number,
        '영업이익률': number, // 영업이익률
        '매출액순이익률': number, // 매출액순이익률
        '부채비율': number, // 부채비율
        '유동비율': number, // 유동비율
        '자기자본비율': number, // 자기자본비율
        '레버리지비율': number // 레버리지비율
    }>;
    readonly graphList: string[];
    readonly unit?: string;
    readonly tooltipId?: string;
    readonly height?: number;
    readonly bodyText: (type: number) => {description: string, tips: string[]};
}

const Container = styled.div<{width?: string}>`
    // 크기
    width: ${({width}) => width};
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    // 스타일
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.primary[40]};
    background-color: white;
`;

const TextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 15px;
`;

const TitleBox = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: space-between;
`;

const TitleLabel = styled.span`
    ${({theme}) => typoStyle.bodyTitle.semiBold(theme)}
    color: ${({theme}) => theme.colors.primary[110]};
`;

const BodyText = styled.p`
    ${({theme}) => typoStyle.caption.light(theme)}
    color: ${({theme}) => theme.colors.natural[60]};
`;

const AiSumaryBox = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    flex-direction: column;
    // 스타일
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.natural[10]};
    box-sizing: border-box;
    padding: 25px;
    margin-top: 20px;
`;

const AiSumary = styled.p<{type: boolean}>`
    ${({theme, type}) => type ? typoStyle.caption.regular(theme) : typoStyle.caption.light(theme)}
    color: ${({theme, type}) => type ? theme.colors.natural[70] : theme.colors.natural[60]};
    padding-bottom: ${({type}) => type ? '10px' : '5px'};
`;

const TooltipSumary = styled.p<{type: boolean}>`
    ${({theme, type}) => type ? typoStyle.caption.regular(theme) : typoStyle.subCaption.light(theme)}
    color: ${({theme, type}) => type ? theme.colors.natural[0] : theme.colors.natural[20]};
    padding-bottom: ${({type}) => type ? '10px' : '5px'};
`;

const GraphBox = ({type, titleLable, textType, data, graphList, unit, tooltipId, bodyText, size, height}: Props) => {
    const theme = useTheme();

    const graph = (type: string) => {
        switch(type) {
            case 'composite':
                return <CompositeGraph data={data} graphList={graphList ?? []} unit={unit ?? '원'} size={size} height={height} />
            case 'group':
                return <GroupBarGraph data={data} graphList={graphList ?? []} unit={unit ?? '원'} size={size} height={height} />
            case 'line':
                return <LineGraph data={data} graphList={graphList ?? []} unit={unit ?? '원'} size={size} height={height} />
            case 'stack':
                return <StackedGraph data={data} graphList={graphList ?? []} unit={unit ?? '원'} size={size} height={height} />
            case 'bar':
                return <BarGraph data={data} graphList={graphList ?? []} unit={unit ?? '원'} size={size} height={height} />
            default:
                return null;
        }
    }

    const textBox = (size: string) => {
        switch(size) {
            case 'sm':
                return (
                    <Container width='100%'>
                        <TextBox>
                            <TitleBox>
                                <TitleLabel>{titleLable}</TitleLabel>
                                <Help color={theme.colors.primary[80]} data-tooltip-id={tooltipId} width={20} />
                                <Tooltip id={tooltipId}>
                                    <TooltipSumary type={true}>Tips.</TooltipSumary>
                                    {bodyText(textType).tips.map((item) => (
                                        <TooltipSumary type={false}>- {item}</TooltipSumary>
                                    ))}
                                </Tooltip>
                            </TitleBox>
                        </TextBox>
                        <Line width='100%' color={theme.colors.natural[15]} margin='30px' />
                        {graph(type)}
                    </Container>
                )
            case 'md':
                return (
                    <Container width='calc(50% - 10px)'>
                        <TextBox>
                            <TitleBox>
                                <TitleLabel>{titleLable}</TitleLabel>
                                <Help color={theme.colors.primary[80]} data-tooltip-id={tooltipId} width={20} />
                                <Tooltip id={tooltipId}>
                                    <TooltipSumary type={true}>Tips.</TooltipSumary>
                                    {bodyText(textType).tips.map((item) => (
                                        <TooltipSumary type={false}>- {item}</TooltipSumary>
                                    ))}
                                </Tooltip>
                            </TitleBox>
                            <BodyText>{bodyText(textType).description}</BodyText>
                        </TextBox>
                        <Line width='100%' color={theme.colors.natural[15]} margin='30px' />
                        {graph(type)}
                        <AiSumaryBox>
                            <AiSumary type={true}>AI 그래프 분석 요약</AiSumary>
                            {bodyText(textType).tips.map((item) => (
                                <AiSumary type={false}>- {item}</AiSumary>
                            ))}
                        </AiSumaryBox>
                    </Container>
                )
            case 'lg':
                return (
                    <Container width='calc(75% - 10px)'>
                        <TextBox>
                            <TitleBox>
                                <TitleLabel>{titleLable}</TitleLabel>
                                <Help color={theme.colors.primary[80]} data-tooltip-id={tooltipId} width={20} />
                                <Tooltip id={tooltipId}>
                                    <TooltipSumary type={true}>Tips.</TooltipSumary>
                                    {bodyText(textType).tips.map((item) => (
                                        <TooltipSumary type={false}>- {item}</TooltipSumary>
                                    ))}
                                </Tooltip>
                            </TitleBox>
                            <BodyText>{bodyText(textType).description}</BodyText>
                        </TextBox>
                        <Line width='100%' color={theme.colors.natural[15]} margin='30px' />
                        {graph(type)}
                        <AiSumaryBox>
                            <AiSumary type={true}>AI 그래프 분석 요약</AiSumary>
                            {bodyText(textType).tips.map((item) => (
                                <AiSumary type={false}>- {item}</AiSumary>
                            ))}
                        </AiSumaryBox>
                    </Container>
                )
            case 'xl':
                return (
                    <Container width='100%'>
                        <TextBox>
                            <TitleBox>
                                <TitleLabel>{titleLable}</TitleLabel>
                                <Help color={theme.colors.primary[80]} data-tooltip-id={tooltipId} width={20} />
                                <Tooltip id={tooltipId}>
                                    <TooltipSumary type={true}>Tips.</TooltipSumary>
                                    {bodyText(textType).tips.map((item) => (
                                        <TooltipSumary type={false}>- {item}</TooltipSumary>
                                    ))}
                                </Tooltip>
                            </TitleBox>
                            <BodyText>{bodyText(textType).description}</BodyText>
                        </TextBox>
                        <Line width='100%' color={theme.colors.natural[15]} margin='30px' />
                        {graph(type)}
                        <AiSumaryBox>
                            <AiSumary type={true}>AI 그래프 분석 요약</AiSumary>
                            {bodyText(textType).tips.map((item) => (
                                <AiSumary type={false}>- {item}</AiSumary>
                            ))}
                        </AiSumaryBox>
                    </Container>
                )
            default:
                return null;
        }
    }

  return (
    textBox(size)
  )
}

export default GraphBox