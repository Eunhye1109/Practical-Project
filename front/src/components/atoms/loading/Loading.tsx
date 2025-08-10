import React from 'react'
import styled from '@emotion/styled'

interface LoadingProps {
  isLoading: boolean;
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: white;
    opacity: 0.5;
    position: fixed;
    top: 0;
    z-index: 1000000;
`;

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
    if (!isLoading) return null;

  return (
    <Container>
      
    </Container>
  )
}

export default Loading