import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

import logo from '../assets/images/logo/logo_vertical.png';
import whiteLogo from '../assets/images/logo/logo_vertical_white.png';

const Container = styled.header<{change: boolean}>`
    height: 50px;
    width: 100%;
    background-color: ${({theme, change}) => change ? theme.colors.primary[100] : theme.colors.primary[10]};
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;
`;

const Content = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoBox = styled(Link)<{change: boolean}>`
    display: flex;
`;

const Logo = styled.img`
    height: 25px;
`;

const Header = () => {
    // 특정 페이지에서 배경색 변경
    const location = useLocation();
    const hidePath = ['/'];
    const change = !hidePath.includes(location.pathname);

  return (
    <Container change={change}>
        <Content>
            <LogoBox change={change} to={'/'}>
                <Logo src={change ? whiteLogo : logo} />
            </LogoBox>
            <Navigation />
        </Content>
    </Container>
  )
}

export default Header