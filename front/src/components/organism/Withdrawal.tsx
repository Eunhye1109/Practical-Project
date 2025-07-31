import React, { useState } from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import { InputBox } from 'components/molecules';
import { Button } from 'components/atoms';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  // 크기
  width: 64%;
  padding: 60px;
  // 디스플레이
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  // 스타일
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors.natural[20]};
`;

const Title = styled.p`
  ${({theme}) => typoStyle.subTitle.bold(theme)};
  color: ${({theme}) => theme.colors.natural[80]};
  margin-bottom: 60px;
`;

const InputForm = styled.div`
  // 크기
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
`;

const NotiBox = styled.div`
  // 크기
  width: 100%;
  // 디스플레이
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 50px;
`;

const NotiText = styled.div<{thickness: boolean}>`
  color: ${({theme, thickness}) => thickness ? theme.colors.natural[60] : theme.colors.natural[40]};
  ${({theme, thickness}) => thickness ? typoStyle.caption.regular(theme) : typoStyle.caption.light(theme)}
`;

const Withdrawal = () => {
  // 페이지 이동
  const navigate = useNavigate();
  // 비밀번호 저장
  const [ currentPw, setCurrentPw] = useState('');
  // 제출 버튼 활성/비활성
  const [btnActive, setBtnActive] = useState('deactive');

  const handlePrevPwOverlapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentPw(e.target.value);
  }
  const handlePwCheckBlur = () => {
    // TODO: 비밀번호 확인 로직
  }

  // TODO: 탈퇴 요청 로직
  const handleJoinClick = () => {
    if(btnActive === 'deactive'){
      alert('비밀번호를 확인해주세요.');
    } else {
      alert('탈퇴가 완료되었습니다.');
      navigate('/');
    }
  }

  return (
    <Container>
      <Title>회원 탈퇴</Title>
      <InputForm>
        <InputBox
            inputLabel='비밀번호를 입력해주세요.'
            inputTitleLabel='비밀번호 확인'
            textLabel='비밀번호가 틀렸습니다.'
            visible={true}
            onChange={handlePrevPwOverlapChange}
            onBlur={handlePwCheckBlur}
            // TODO: value값 받아온 데이터로 넣기
          />
        </InputForm>
        <NotiBox>
          <NotiText thickness={false}>회원탈퇴 시 해당 계정의 모든 정보는 즉시 삭제되며 복구가 불가능합니다.</NotiText>
          <NotiText thickness={true}>탈퇴를 진행하시겠습니까?</NotiText>
        </NotiBox>
        <Button
          label='회원정보수정'
          variant={btnActive}
          size='lg'
          margin=''
          onClick={handleJoinClick}
        />
    </Container>
  )
}

export default Withdrawal