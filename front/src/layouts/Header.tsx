import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const Container = styled.header<{change: boolean}>`
    height: 50px;
    width: 100%;
    background-color: ${({theme, change}) => change ? theme.colors.natural[90] : theme.colors.primary[10]};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled(Link)<{change: boolean}>`
    font-family: 'SB어그로';
    font-weight: 300;
    color: ${({theme, change}) => change ? theme.colors.natural[0] : theme.colors.primary[100]};
    font-size: 16px;
    text-decoration: none;
    display: flex;
`;

interface Props {
    readonly logoTitle: string;

}

const Header = ({logoTitle}: Props) => {
    // 특정 페이지에서 배경색 변경
    const location = useLocation();
    const hidePath = ['/'];
    const change = !hidePath.includes(location.pathname);

  return (
    <Container change={change}>
        <Content>
            <Logo change={change} to={'/'}>{logoTitle}</Logo>
            <Navigation />
        </Content>
    </Container>
  )
}

export default Header