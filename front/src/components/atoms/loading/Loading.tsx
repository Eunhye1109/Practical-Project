import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import ch from 'assets/images/etc/loading01.gif';

interface LoadingProps {
  isLoading: boolean;
  label: string;
  url: string;
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    z-index: 1000000;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

const LoadingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 15%;
`;

const Label = styled.p`
  ${({theme}) => typoStyle.subTitle.regular(theme)}
  font-size: 20px;
  color: ${({theme}) => theme.colors.primary[100]};
`;

const ChImg = styled.img`
  width: 15%;
`;

const Loading: React.FC<LoadingProps> = ({ isLoading, label, url }) => {
    if (!isLoading) return null;

  return (
    <Container>
      <LoadingBox>
        <ChImg src={ch} />
        <Label>{label}</Label>
      </LoadingBox>
    </Container>
  )
}

export default Loading