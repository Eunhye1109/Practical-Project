import React from 'react'
import styled from '@emotion/styled'
import { IconTextButton } from 'components/atoms';
import { typoStyle } from 'styles/typoStyle';
import { Bookmark, BookmarkStar, Docs, Share } from 'assets/icons';
import { useTheme } from '@emotion/react';

interface Props {
  readonly imgUrl: string;
  readonly corpName: string;
  readonly corpCategory: string;
  readonly corpKeyword: string[];
  readonly shareOnClick?: () => void;
  readonly saveOnClick?: () => void;
  readonly reportOnClick?: () => void;
  readonly onOff: boolean;
}

const Container = styled.div`
  // 크기
  width: 85%;
  // 디스플레이
  margin-top: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  // 크기
  width: 70px;
  height: 70px;
  // 스타일
  border-radius: 50%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`;

const Text = styled.p<{textStyle: boolean}>`
  ${({textStyle, theme}) => textStyle ? typoStyle.subTitle.bold(theme) : typoStyle.subBody.regular(theme)}
  color: ${({theme}) => theme.colors.natural[70]};
  padding: 0;
  margin: 0;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const ButtonTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ReportHeader = ({imgUrl, corpName, corpCategory, corpKeyword, shareOnClick, saveOnClick, reportOnClick, onOff}: Props) => {
  const theme = useTheme();
  return (
    <Container>
        <Logo src={imgUrl} alt={corpName} />
        <TextBox>
          <ButtonTextBox>
            <Text textStyle={true}>{corpName}</Text>
            <ButtonBox>
              <IconTextButton onClick={saveOnClick} label={'관심기업저장'} icon={onOff ? <BookmarkStar color={theme.colors.primary[100]} /> : <Bookmark />} />
              <IconTextButton onClick={shareOnClick} label={'기업공유'} icon={<Share />} />
              <IconTextButton onClick={reportOnClick} label={'기업리포트생성'} icon={<Docs />} />
            </ButtonBox>
          </ButtonTextBox>
          <Text textStyle={false}>{corpCategory} | {corpKeyword[0]}, {corpKeyword[1]}, {corpKeyword[2]}</Text>
        </TextBox>
    </Container>
  )
}

export default ReportHeader