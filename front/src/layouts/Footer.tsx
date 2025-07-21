import React from 'react'
import styled from '@emotion/styled'

const Container = styled.footer`
    width: 100%;
    height: 100px;
    background-color: ${({theme}) => theme.colors.natural90};
`;

const Footer = () => {
  return (
    <Container>
        Footer
    </Container>
  )
}

export default Footer