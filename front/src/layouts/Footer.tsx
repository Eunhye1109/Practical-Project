import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';

const Container = styled.footer`
    width: 100%;
    height: 100px;
    background-color: ${({theme}) => theme.colors.natural90};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
`;

const Logo = styled(Link)`
    font-family: 'SB어그로';
    font-weight: 300;
    color: ${({theme}) => theme.colors.natural80};
    font-size: 24px;
    text-decoration: none;
    display: flex;
`;

const Body = styled.p`
    font-size: 14px;
    color: ${({theme}) => theme.colors.natural70};
    text-align: center;
`;

interface Props {
    readonly logoTitle: string;
}

const Footer = ({logoTitle}: Props) => {
  return (
    <Container>
        <Content>
            <Logo to={'/'}>{logoTitle}</Logo>
            <Body>
                요즘기업 보고서는 상장기업의 공개 데이터를 바탕으로 투자자 관점에서 기업 정보를 시각화하고 요약하는 포트폴리오 프로젝트입니다. <br />© 2025 team 취향. All rights reserved.
            </Body>
        </Content>
    </Container>
  )
}

export default Footer