import React, { useContext } from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import { Line } from 'components/atoms';
import { useTheme } from '@emotion/react';
import { useLogin } from 'contexts/LoginContext';

interface Props {
    readonly titleLabel: string;
    readonly corpSumary: string;
    readonly infoData: string[];
}

const Container = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 30px;
    // 스타일
    border-radius: 10px;
    background-image: ${({theme}) => theme.colors.gradient.cross};
`;

const TextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 15px;
`;

const TitleLabel = styled.p`
    ${({theme}) => typoStyle.bodyTitle.semiBold(theme)}
    color: white;
`;

const SubTitleLabel = styled.p`
    ${({theme}) => typoStyle.body.semiBold(theme)}
    color: white;
`;

const BodyText = styled.p`
    ${({theme}) => typoStyle.caption.light(theme)}
    color: rgba(255, 255, 255, 0.8);
`;

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const InfoBox = styled.div<{width: string}>`
    width: ${({width}) => width};
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const ReportInfoBox = ({titleLabel, corpSumary, infoData}: Props) => {
    const infoCategory = ['CEO', '상장여부', '연간매출', '고용인원', '설립일자'];
  return (
    <Container>
        <TextBox>
            <TitleLabel>{titleLabel}</TitleLabel>
            <BodyText>{corpSumary}</BodyText>
        </TextBox>
        <Line width='100%' color='white' margin='30px' />
        <ContentBox>
            {infoData.map((info, index) => (
                <InfoBox width={100 / infoData.length + '%'}>
                    <BodyText>{infoCategory[index]}</BodyText>
                    <SubTitleLabel>{info}</SubTitleLabel>
                </InfoBox>
            ))}
        </ContentBox>
    </Container>
  )
}

export default ReportInfoBox