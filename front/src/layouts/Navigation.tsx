import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { Login, Join, Person, Bookmark, History, Logout } from 'assets/icons';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const StyledLink = styled(Link)<{change: boolean}>`
    // 디스플레이 세팅
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    // 스타일 세팅
    text-decoration: none;
    color: ${({theme, change}) => change ? theme.colors.natural[0] : theme.colors.primary[100]};
    font-size: 16px;

    transition: 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

const Icon = styled.div`
    // 크기 세팅
    width: 20px;
    height: 20px;
    // 디스플레이 세팅
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Navigation = () => {
    const location = useLocation();
    const hidePath = ['/'];
    const change = !hidePath.includes(location.pathname);

    const [nav, setNav] = useState([
        {label: '관심기업', to: '/mypage?tab=0', icon: <Bookmark />},
        {label: '최근조회보고서', to: '/mypage?tab=1', icon: <History />},
        {label: '마이페이지', to: '/mypage?tab=2', icon: <Person />},
        {label: '로그아웃', to: '/', icon: <Logout />},
        {label: '로그인', to: '/login', icon: <Login />},
        {label: '회원가입', to: '/join', icon: <Join />}
    ]);

    // TODO: 로그인 상태에 따라 nav 배열 안의 내용물 바뀌게 하는 로직 추가
    //       (내용물: 관심기업 / 최근조회보고서 / 마이페이지 / 로그아웃)
    const login = (state: boolean) => {
        if(state) {
            setNav([
                {label: '관심기업', to: '/mypage?tab=0', icon: <Bookmark />},
                {label: '최근조회보고서', to: '/mypage?tab=1', icon: <History />},
                {label: '마이페이지', to: '/mypage?tab=2', icon: <Person />},
                {label: '로그아웃', to: '/', icon: <Logout />}
            ])
        } else {
            setNav([
                {label: '로그인', to: '/login', icon: <Login />},
                {label: '회원가입', to: '/join', icon: <Join />}
            ])
        }
    }

  return (
    <Container>
        {nav.map((item, index) => (
            <StyledLink change={change} key={index} to={item.to} onClick={() => {
                if(item.label === '로그아웃') {
                    alert('로그아웃');
                }
            }}>
                <Icon>{item.icon}</Icon>
                {item.label}
            </StyledLink>
        ))}
    </Container>
  )
}

export default Navigation