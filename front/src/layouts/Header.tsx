import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Container = styled.header`
    height: 50px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.natural90};
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

const Logo = styled(Link)`
    font-family: 'SB어그로';
    font-weight: 300;
    color: white;
    font-size: 16px;
    text-decoration: none;
    display: flex;
`;

interface Props {
    readonly logoTitle: string;

}

const Header = ({logoTitle}: Props) => {
  return (
    <Container>
        <Content>
            <Logo to={'/'}>{logoTitle}</Logo>
            <Navigation />
        </Content>
    </Container>
  )
}

export default Header