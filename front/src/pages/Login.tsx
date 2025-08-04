import React from 'react'
import styled from '@emotion/styled'
import bg from '../assets/images/bg/background09.png'
import logo from '../assets/images/logo/logo_horizental.png';
import { typoStyle } from 'styles/typoStyle';
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'components/atoms';
import { InputBox } from 'components/molecules';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Button } from 'components/atoms';
// 백엔드 연결
import { useLogin } from 'contexts/LoginContext';
import { loginUser } from 'api/userApi';
import { LoginType } from 'types/user.types';

interface Props {
  readonly bgImg: string;
}

const Container = styled.div<Props>`
  // 크기 세팅
  width: 100%;
  height: 100vh;
  // 디스플레이 세팅
  display: flex;
  justify-content: end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 20px;
  // 배경 세팅
  background-image:
    ${({theme}) => theme.colors.gradient.crossOpacity},
    url(${bg}),
    ${({theme}) => theme.colors.gradient.cross};
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  // 크기 세팅
  width: calc(50% - 10px);
  height: calc(100% - 40px);
  border-radius: 10px;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  // 배경 세팅
  /* background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid white; */
  background-color: white;
  border: 1px solid ${({theme}) => theme.colors.natural[20]};
`;

const Logo = styled.img`
  height: 40px;
  position: static;
  bottom: 100px;
`;

const Title = styled.div`
  // 크기 세팅
  width: 80%;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  // 간격 조정
  margin-bottom: 40px;
`;

const MainText = styled.p`
  ${({theme}) => typoStyle.title.bold(theme)}
  color: ${({theme}) => theme.colors.natural[90]};
`;

const SubText = styled.p`
  ${({theme}) => typoStyle.body.regular(theme)}
  color: ${({theme}) => theme.colors.natural[70]};
`;

const InputContent = styled.div`
  // 크기 세팅
  width: 60%;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const JoinContent = styled.div`
  // 크기 세팅
  width: 80%;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  // 간격 조정
  margin-bottom: 50px;
`;

const JoinText = styled.p`
  // 디스플레이 세팅
  display: inline;
  // 텍스트 스타일
  color: ${({theme}) => theme.colors.natural[50]};
  ${({theme}) => typoStyle.caption.light(theme)};
  text-align: center;
  line-height: 1.2rem;
`;

const JoinLink = styled(Link)`
  // 텍스트 스타일
  color: ${({theme}) => theme.colors.natural[60]};
  ${({theme}) => typoStyle.caption.regular(theme)};

  &:hover {
    opacity: 0.8;
  }
`;

const Login = () => {
  const {login} = useLogin();
  const navigate = useNavigate();
  const theme = useTheme();
  // 아이디/비번 값 관리
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [riskType, setRiskType] = useState('');
  // 버튼 스타일
  const [btnStyle, setBtnStyle] = useState('deactive');

  // 로그인 버튼 활성/비활성
  useEffect(() => {
    if(userId === '' || userPw === '') {
      setBtnStyle('deactive')
    } else {
      setBtnStyle('primary')
    }
  }, [userId, userPw]);

  const handleLoginClick = async () => {
    try {
      const loginData: LoginType = {userId, userPw, riskType};
      const userData = await loginUser(loginData);
      if(userData.success) {
        login(userData);
        alert('환영합니다.');
        navigate('/');
        console.log(userData);
      } else {
        alert('아이디 또는 패스워드가 일치하지 않습니다.');
        console.log(userData);
      }
    } catch(err: any) {
      console.error('로그인 오류:', err.response?.data || err.message);
      alert('로그인 실패');
    }
  }

  return (
    <Container bgImg={bg}>
      <Content>
        <Title>
          <MainText>로그인</MainText>
          <SubText>어서오세요, 환영합니다!</SubText>
        </Title>
        <Line width='60%' color={theme.colors.primary[50]} margin='30px' />
        <InputContent>
          <InputBox
            inputLabel='아이디를 입력해주세요.'
            inputTitleLabel='아이디'
            textLabel='아이디를 확인해주세요.'
            visible={true}
            onChange={(e) => {setUserId(e.target.value)}}
          />
          <InputBox
            inputLabel='비밀번호를 입력해주세요.'
            inputTitleLabel='비밀번호'
            textLabel='비밀번호를 확인해주세요.'
            type='password'
            visible={true}
            onChange={(e) => setUserPw(e.target.value)}
          />
        </InputContent>
        <Button variant={btnStyle} size='lg' label='로그인' margin='20px' onClick={handleLoginClick} />
        <JoinContent>
          <JoinText>
            아직 계정이 없으신가요? <br />
            지금 바로 <JoinLink to='/join'>[회원가입]</JoinLink>하고 서비스를 이용해보세요!
          </JoinText>
        </JoinContent>
        <Line width='60%' color={theme.colors.primary[50]} margin='30px' />
        <Link to='/'>
          <Logo src={logo} />
        </Link>
      </Content>
    </Container>
  )
}

export default Login