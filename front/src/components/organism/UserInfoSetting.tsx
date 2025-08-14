import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { Button } from 'components/atoms';
import { UpdateUserVO, UserDTO } from 'types/user.types';
import { useNavigate } from 'react-router-dom';
import { joinDropdownOption, joinInputOptions } from 'constants/userInfoSettingOption';
import { DropdownBox, InputBox } from 'components/molecules';
import { userDataInquiry, userDataUpdate } from 'api/mypageApi';
import { useLogin } from 'contexts/LoginContext';
import { idCheckUser } from 'api/userApi';

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

const DropdownForm = styled.div`
  // 크기
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 60px;
`;

const UserInfoSetting = () => {
  const {user, login} = useLogin();
  // 페이지 이동
  const navigate = useNavigate();
  // 아이디/비번 에러 메시지 활성/비활성
  const [idVisible, setIdVisible] = useState(true);
  const [prevPwVisible, setPrevPwVisible] = useState(true);
  const [pwVisible, setPwVisible] = useState(true);
  // 비밀번호 중복 확인
  const [pwOverlap, setPwOverlap] = useState('');
  const [prevPwOverlap, setPrevPwOverlap] = useState('');
  // 제출 버튼 활성/비활성
  const [btnActive, setBtnActive] = useState('deactive');
  // 사용자 데이터(데이터 받아와서 넣기)
  const [formData, setFormData] = useState<UpdateUserVO>();
  // 사용자 기존 비밀번호
  const [currentPw, setCurrentPw] = useState();

  // 사용자 데이터 받아오기
  useEffect(() => {
    const currentUserData = async () => {
      try {
        const res = await userDataInquiry(user?.userId ?? '');
        const resRe: UpdateUserVO = {
          userId: res.userInfo.userId,
          newUserId: res.userInfo.userId,
          userPw: res.userInfo.userPw,
          userPhone: res.userInfo.userPhone,
          userJob: res.userInfo.userJob,
          userPurpose: res.userInfo.userPurpose,
          riskType: res.userInfo.riskType
        } 
        setFormData(resRe);
        console.log('유저정보: ', res.userInfo);
        setCurrentPw(res.userInfo.userPw);
      } catch (e) {
      }
    } 
    currentUserData();
  }, [user])


  // input 데이터 저장 메소드
  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData( prev => {
      if (!prev) return prev;
      return {...prev, [name]: e.target.value}
    });
  }
  const handlePwOverlapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPwOverlap(e.target.value);
  }
  const handlePrevPwOverlapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPrevPwOverlap(e.target.value);
  }
  // dropdown 데이터 저장 메소드
  const handleDropdownChange = (name: string) => (selected: string[]) => {
    setFormData(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: selected[0]}
    });
  };

  // 아이디 중복 확인 메소드
  const handleIdCheckBlur = async () => {
    try {
      const res = await idCheckUser(formData?.newUserId ?? '');
      console.log('아이디 중복 검사', res);
      
      if(res.success) {
        setIdVisible(true);
        console.log('중복 미존재: ', res.success);
        
      } else {
        setIdVisible(false);
        console.log('중복 존재: ', res.success);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 현재 비밀번호 일치 확인 메소드 & 버튼 활성화
  const handlePrevPwCheckBlur = () => {
    if(currentPw !== prevPwOverlap) {
      setPrevPwVisible(false);
    } else {
      setPrevPwVisible(true);
    }
  }

  // 비밀번호 중복 확인 메소드
  const handlePwCheckBlur = () => {
    // 둘 중 하나라도 빈칸이면 true
    if(formData?.userPw === '' || pwOverlap === '') {
      setPwVisible(true);
      return ;
    }
    // 두 값이 일치하면 true
    if(formData?.userPw === pwOverlap) {
      setPwVisible(true);
    } else {
      setPwVisible(false);
    }
  }

  // 데이터 수정 확인
  useEffect(() => {
    console.log('[DEBUG] formData changed:', formData);
    if(idVisible && prevPwVisible && pwVisible && prevPwVisible && prevPwOverlap !== null && prevPwOverlap !== '') {
      console.log(idVisible, prevPwVisible, pwVisible, prevPwVisible);
      setBtnActive('default');
    } else {
      console.log(idVisible, prevPwVisible, pwVisible, prevPwVisible);
      setBtnActive('deactive');
    }
  }, [formData, pwOverlap, prevPwOverlap]);

  // 데이터 제출 로직(정보 수정 완료)
  const handleJoinClick = async () => {
    if(btnActive === 'deactive'){
      alert('현재 비밀번호를 확인해주세요.');
    } else if (formData) {
      try {
        const res = await userDataUpdate(formData);
        login({userId: formData.newUserId, userPw: formData.userPw, riskType: formData.riskType});
        alert('회원정보가 수정되었습니다.');
      } catch (e) {
        alert('실패');
      }
    }
  }

  return (
    <Container>
        <Title>내 정보 수정</Title>
        <InputForm>
          {joinInputOptions.map((opt, index) => (
            <InputBox
              key={index}
              inputLabel={opt.inputLabel}
              inputTitleLabel={opt.inputTitleLabel}
              textLabel={opt.textLabel}
              visible={opt.visible ? (opt.name === 'newUserId' ? idVisible : (opt.name === 'userPw' ? pwVisible : prevPwVisible)) : true}
              type={opt.type ?? 'text'}
              onChange={opt.name == 'pwCheck' ? handlePwOverlapChange : (opt.name === 'prevPw' ? handlePrevPwOverlapChange : handleInputChange(opt.name))}
              onBlur={opt.blur ? (opt.name === 'newUserId' ? handleIdCheckBlur : (opt.name === 'userPw' ? handlePwCheckBlur : handlePrevPwCheckBlur)) : undefined}
              value={
                opt.name === 'newUserId' ? formData?.newUserId : (opt.name === 'userPhone' ? formData?.userPhone : undefined)
              }
            />
          ))}
        </InputForm>
        <DropdownForm>
          {joinDropdownOption.map((opt, index) => (
            <DropdownBox
              key={index}
              itemList={opt.categoryList}
              label={opt.label}
              mode={'radio'}
              onChange={handleDropdownChange(opt.name)}
              btnLabel={opt.name === 'userJob' ? formData?.userJob : (opt.name === 'userPurpose' ? formData?.userPurpose : formData?.riskType)}
              selfSelected={opt.name === 'userJob' ? formData?.userJob : (opt.name === 'userPurpose' ? formData?.userPurpose : formData?.riskType)}
            />
          ))}
        </DropdownForm>
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

export default UserInfoSetting