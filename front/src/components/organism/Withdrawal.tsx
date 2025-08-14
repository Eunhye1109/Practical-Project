import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import { InputBox } from 'components/molecules';
import { Button } from 'components/atoms';
import { useNavigate } from 'react-router-dom';
import { DeleteUserType } from 'types/user.types';
import { useLogin } from 'contexts/LoginContext';
// 백엔드 연결
import { deleteId } from 'api/userApi';

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
  margin-top: 20px;
`;

const NotiText = styled.div<{thickness: boolean}>`
  color: ${({theme, thickness}) => thickness ? theme.colors.natural[60] : theme.colors.natural[40]};
  ${({theme, thickness}) => thickness ? typoStyle.caption.regular(theme) : typoStyle.caption.light(theme)}
`;

const Withdrawal = () => {
  const {user, logout} = useLogin();
  // 페이지 이동
  const navigate = useNavigate();
  // 비밀번호 저장
  const [currentPw, setCurrentPw] = useState('');
  // 제출 버튼 활성/비활성
  const [btnActive, setBtnActive] = useState('deactive');
  // 경고 문구 활성/비활성
  const [warning, setWarning] = useState(true);
  // 제출 데이터
  const deleteUser:DeleteUserType = {userId: user?.userId ?? '', userPw: user?.userPw ?? ''}

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentPw(e.target.value);
    if((currentPw !== '' && currentPw !== null && currentPw !== undefined) && e.target.value === deleteUser.userPw) {
      setBtnActive('default');
    }
  }
  const handlePwCheckBlur = () => {
    if((currentPw !== '' && currentPw !== null && currentPw !== undefined) && currentPw !== deleteUser.userPw) {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }

  const handleJoinClick = async () => {
    try {
      const result = await deleteId(deleteUser);
      if(result.success) {
          deleteId(deleteUser);
          logout();
          navigate('/');
          alert('탈퇴가 완료되었습니다.');
        }
      } catch (e) {
        alert('비밀번호를 확인해주세요.');
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
            visible={warning}
            onChange={handlePwChange}
            onBlur={handlePwCheckBlur}
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