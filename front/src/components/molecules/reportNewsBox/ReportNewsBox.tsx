import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { Help } from 'assets/icons';
import { theme } from 'styles/theme';
import { Tooltip } from 'react-tooltip';
import { Line } from 'components/atoms';
import { useTheme } from '@emotion/react';
import bg from 'assets/images/bg/background11.png';

interface Props {
    newsData: Array<{date: string, title: string, body: string, link: string}>;
    corpName: string;
}

const Container = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const Content = styled.div`
    width: calc(50% - 10px);
    // 디스플레이
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
    // 스타일
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.primary[40]};
    background-color: white;
`;

const NewContent = styled.div`
    width: calc(50% - 10px);
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
    gap: 5px;
    // 스타일
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.primaryBlue[40]};
    background-image:
        ${({theme}) => theme.colors.gradient.crossOpacity},
        url(${bg}),
        ${({theme}) => theme.colors.gradient.greenCross};
    background-size: cover;
    background-position: center;
`;

const NewsContent = styled.div`
    width: 100%;
    height: 100%;
    // 디스플레이
    display: flex;
    flex-direction: column;
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

const NewsItemBox = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    box-sizing: border-box;
    gap: 10px;
    padding: 15px;
    // 스타일
    border-radius: 5px;

    transition: 0.3s ease-in-out;

    &:hover {
        background-color: ${({theme}) => theme.colors.natural[10]};
    }
`;

const NewsItem = styled.span<{width: string, thickness: boolean, color: string, position: boolean}>`
    width: ${({width}) => width};
    ${({thickness, theme}) => thickness ? theme.typo.caption1Regular : theme.typo.caption1Light};
    color: ${({color}) => color};
    text-align: ${({position}) => position ? 'right' : 'left'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const NewsTitle = styled.a<{width: string}>`
    width: ${({width}) => width};
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: ${({theme}) => theme.colors.natural[20]};
    }
`;

const RiskSubTitle = styled.span<{thick: boolean}>`
    font-size: 20px;
    font-weight: ${({thick}) => thick ? 300 : 200};
    font-family: 'SB어그로';
    color: white;
`;

const RiskRank = styled.span`
    font-size: 100px;
    font-weight: 300;
    font-family: 'SB어그로';
    color: white;
`;

const TestBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
`;

const ReportNewsBox = ({newsData, corpName}: Props) => {
    const theme = useTheme();
  return (
    <Container>
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>연관기사</TitleLabel>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.natural[15]} margin='10px' />
            {newsData === null ? 
                <TestBox>
                    <NewsTitle href={''} width='70%'>
                        <NewsItem width='100%' thickness={true} color={theme.colors.natural[60]} position={false}>연관기사를 찾지 못했습니다.</NewsItem>
                    </NewsTitle>
                </TestBox>
                : <NewsContent>
                    {newsData.map((item) => (
                        <NewsItemBox>
                            <NewsTitle href={item.link} width='70%'>
                                <NewsItem width='100%' thickness={true} color={theme.colors.natural[60]} position={false}>{item.title}</NewsItem>
                                <NewsItem width='100%' thickness={false} color={theme.colors.natural[40]} position={false}>{item.body}</NewsItem>
                            </NewsTitle>
                            <NewsItem width='30%' thickness={false} color={theme.colors.natural[40]} position={true}>{item.date}</NewsItem>
                        </NewsItemBox>
                    ))}
                </NewsContent>
            }
        </Content>

        <NewContent>
            <div>
                <RiskSubTitle thick={true}>{corpName}</RiskSubTitle>
                <RiskSubTitle thick={false}>의 리스크 점수는</RiskSubTitle>
            </div>
            <RiskRank>A랭크</RiskRank>
        </NewContent>
    </Container>
  )
}

export default ReportNewsBox