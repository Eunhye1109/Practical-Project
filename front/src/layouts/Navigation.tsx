import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 16px;

    &:not(:last-child)::after {
        margin-left: 20px;
        content: '|';
    }
`;

const Navigation = () => {
    const [nav, setNav] = useState([
        {label: '로그인', to: 'login'},
        {label: '회원가입', to: 'join'}
    ]);

    // TODO: 로그인 상태에 따라 nav 배열 안의 내용물 바뀌게 하는 로직 추가
    //       (내용물: 관심기업 / 최근조회보고서 / 마이페이지 / 로그아웃)

  return (
    <Container>
        {nav.map((item, index) => (
            <StyledLink key={index} to={item.to}>{item.label}</StyledLink>
        ))}
    </Container>
  )
}

export default Navigation