import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const StyledLink = styled(Link)<{change: boolean}>`
    text-decoration: none;
    color: ${({theme, change}) => change ? theme.colors.natural[0] : theme.colors.primary[100]};
    font-size: 16px;

    &:hover {
        opacity: 0.8;
    }
`;

const Navigation = () => {
    const location = useLocation();
    const hidePath = ['/'];
    const change = !hidePath.includes(location.pathname);

    // TODO: 가능하다면 아이콘 추가해보기
    const [nav, setNav] = useState([
        {label: '로그인', to: 'login'},
        {label: '회원가입', to: 'join'}
    ]);

    // TODO: 로그인 상태에 따라 nav 배열 안의 내용물 바뀌게 하는 로직 추가
    //       (내용물: 관심기업 / 최근조회보고서 / 마이페이지 / 로그아웃)

  return (
    <Container>
        {nav.map((item, index) => (
            <StyledLink change={change} key={index} to={item.to}>{item.label}</StyledLink>
        ))}
    </Container>
  )
}

export default Navigation