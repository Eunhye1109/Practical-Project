import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { Button } from 'components/atoms';
import { UserDTO } from 'types/user.types';
import { useNavigate } from 'react-router-dom';
import { joinDropdownOption, joinInputOptions } from 'constants/userInfoSettingOption';
import { DropdownBox, InputBox } from 'components/molecules';

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
  // 테스트용 데이터
  const drop01 = ['직업3', '목적2', '유형3']
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
  const [formData, setFormData] = useState<UserDTO>({
    userId: '',
    userPw: '',
    phone: '',
    job: '',
    purpose: '',
    investmentType: '',
    agreement: true
  });

  // input 데이터 저장 메소드
  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({...prev, [name]: e.target.value}));
  }
  const handlePwOverlapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPwOverlap(e.target.value);
  }
  const handlePrevPwOverlapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPrevPwOverlap(e.target.value);
  }
  // dropdown 데이터 저장 메소드
  const handleDropdownChange = (name: string) => (selected: string[]) => {
    setFormData(prev => ({ ...prev, [name]: selected[0] }));
  };

  // 아이디 중복 확인 메소드
  const handleIdCheckBlur = () => {
    // TODO: 로직 작성
  }

  // 현재 비밀번호 일치 확인 메소드
  const handlePrevPwCheckBlur = () => {
    // TODO: 불러온 데이터와 입력된 데이터 대조
  }

  // 비밀번호 중복 확인 메소드
  const handlePwCheckBlur = () => {
    // 둘 중 하나라도 빈칸이면 true
    if(formData.userPw === '' || pwOverlap === '') {
      setPwVisible(true);
      return;
    }
    // 두 값이 일치하면 true
    if(formData.userPw === pwOverlap) {
      setPwVisible(true);
    } else {
      setPwVisible(false);
    }
  }

  // 데이터 수정 확인
  useEffect(() => {
    console.log('[DEBUG] formData changed:', formData);
  }, [formData, idVisible, pwVisible]);

  // TODO: 데이터 제출 로직(정보 수정 완료)
  const handleJoinClick = () => {
    if(btnActive === 'deactive'){
      alert('현재 비밀번호를 확인해주세요.');
    } else {
      alert('회원정보가 수정되었습니다.');
      navigate('/');
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
              visible={opt.visible ? (opt.name === 'id' ? idVisible : (opt.name === 'pw' ? pwVisible : prevPwVisible)) : true}
              type={opt.type ?? 'text'}
              onChange={opt.name == 'pwCheck' ? handlePwOverlapChange : (opt.name === 'prevPw' ? handlePrevPwOverlapChange : handleInputChange(opt.name))}
              onBlur={opt.blur ? (opt.name === 'id' ? handleIdCheckBlur : (opt.name === 'pw' ? handlePwCheckBlur : handlePrevPwCheckBlur)) : undefined}
              // TODO: value값 받아온 데이터로 넣기
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
              // TODO: 나중에 받아온 데이터로 바꾸기
              btnLabel={drop01[index]}
              selfSelected={drop01[index]}
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