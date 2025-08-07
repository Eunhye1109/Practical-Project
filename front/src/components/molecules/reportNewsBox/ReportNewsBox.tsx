import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { Help } from 'assets/icons';
import { theme } from 'styles/theme';
import { Tooltip } from 'react-tooltip';
import { Line } from 'components/atoms';
import { useTheme } from '@emotion/react';

interface Props {
    newsData: Array<{date: string, title: string, body: string, url: string}>
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
    justify-content: start;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
    // 스타일
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.primaryBlue[40]};
    background-image: ${({theme}) => theme.colors.gradient.greenCross};
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

    &:hover {
        text-decoration: underline;
        color: ${({theme}) => theme.colors.natural[20]};
    }
`;

const ReportNewsBox = ({newsData}: Props) => {
    const theme = useTheme();
  return (
    <Container>
        <Content>
            <TextBox>
                <TitleBox>
                    <TitleLabel>연관기사</TitleLabel>
                    <Help color={theme.colors.primary[80]} data-tooltip-id='id00' width={20} />
                    <Tooltip id='id00'>해당 지표 근거 ~~~</Tooltip>
                </TitleBox>
            </TextBox>
            <Line width='100%' color={theme.colors.natural[15]} margin='10px' />
            <NewsContent>
                {newsData.map((item) => (
                    <NewsItemBox>
                        <NewsTitle href={item.url} width='70%'>
                            <NewsItem width='100%' thickness={true} color={theme.colors.natural[60]} position={false}>{item.title}</NewsItem>
                            <NewsItem width='100%' thickness={false} color={theme.colors.natural[40]} position={false}>{item.body}</NewsItem>
                        </NewsTitle>
                        <NewsItem width='30%' thickness={false} color={theme.colors.natural[40]} position={true}>{item.date}</NewsItem>
                    </NewsItemBox>
                ))}
            </NewsContent>
        </Content>

        <NewContent>
            
        </NewContent>
    </Container>
  )
}

export default ReportNewsBox