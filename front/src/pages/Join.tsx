import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom';
import { typoStyle } from 'styles/typoStyle';
import { Button, IconButton, Line } from 'components/atoms';
import { theme } from 'styles/theme';
import { DropdownBox, InputBox } from 'components/molecules';
import { UserInfoData } from 'types/user.types';
import { CheckBox, CheckBoxOutline } from 'assets/icons';
import { jobList, purposeList, investmentTypeList, joinInputOptions, agreementText, joinDropdownOption } from 'constants/joinOption';

const Container = styled.div`
  // 크기
  width: 100%;
  height: 100%;
  margin-top: 50px;
  // 디스플레이
  display: flex;
  justify-content: center;
  align-items: start;
  // 스타일
  background-color: ${({theme}) => theme.colors.primary[10]};
`;

const Content = styled.div`
  // 크기
  width: 50%;
  padding: 60px;
  // 디스플레이
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  margin-top: 70px;
  margin-bottom: 100px;
  // 스타일
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors.natural[20]};
`;

const Title = styled.p`
  ${({theme}) => typoStyle.subTitle.bold(theme)};
  color: ${({theme}) => theme.colors.natural[90]};
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

const AgreementForm = styled.div`
  // 크기
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  margin-bottom: 60px;
`;

const AgreementBox = styled.div`
  // 크기 세팅
  width: 100%;
  // 디스플레이 세팅
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5px;
`;

const Agreement = styled.div`
  // 크기
  width: 100%;
  // 디스플레이
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // 스타일
  border: 1px solid ${({theme}) => theme.colors.natural[20]};
  border-radius: 5px;
  `;

const AgreementCheck = styled.div`
  // 크기
  width: 100%;
  height: 50px;
  // 디스플레이
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  // 스타일
  ${({theme}) => typoStyle.caption.regular(theme)}
  color: ${({theme}) => theme.colors.natural[80]};
  `;

const AgreementBody = styled.div`
  // 크기
  width: 100%;
  max-height: 200px;
  // 디스플레이
  padding: 10px;
  box-sizing: border-box;
  overflow-y: scroll;
  // 스타일
  background-color: ${({theme}) => theme.colors.natural[5]};
  ${({theme}) => typoStyle.caption.regular(theme)}
  white-space: pre-line;
  line-height: 1.4rem;
  color: ${({theme}) => theme.colors.natural[70]};
`;

const AgreementTitle = styled.p`
  ${({theme}) => typoStyle.caption.regular(theme)}
`;

const SubTitle = styled.p`
  ${({theme}) => typoStyle.body.semiBold(theme)};
  color: ${({theme}) => theme.colors.natural[80]};
  margin-bottom: 20px;
`;

const Join = () => {
  // 페이지 이동
  const navigate = useNavigate();
  // 아이디/비번 에러 메시지 활성/비활성
  const [idVisible, setIdVisible] = useState(true);
  const [pwVisible, setPwVisible] = useState(true);
  // 비밀번호 중복 확인
  const [pwOverlap, setPwOverlap] = useState('');
  // 제출 버튼 활성/비활성
  const [btnActive, setBtnActive] = useState('deactive');

  // 사용자 데이터 
  const [formData, setFormData] = useState<UserInfoData>({
    id: '',
    pw: '',
    phone: '',
    job: jobList[0],
    purpose: purposeList[0],
    investmentType: investmentTypeList[0],
    agreement: false
  });

  // input 데이터 저장 메소드
  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({...prev, [name]: e.target.value}));
  }
  const handlePwOverlapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPwOverlap(e.target.value);
  }
  // dropdown 데이터 저장 메소드
  const handleDropdownChange = (name: string) => (selected: string[]) => {
    setFormData(prev => ({ ...prev, [name]: selected[0] }));
  };

  // 아이디 중복 확인 메소드
  const handleIdCheckBlur = () => {
    // TODO: 로직 작성
  }

  // 비밀번호 중복 확인 메소드
  const handlePwCheckBlur = () => {
    // 둘 중 하나라도 빈칸이면 true
    if(formData.pw === '' || pwOverlap === '') {
      setPwVisible(true);
      return;
    }
    // 두 값이 일치하면 true
    if(formData.pw === pwOverlap) {
      setPwVisible(true);
    } else {
      setPwVisible(false);
    }
  }

  // 데이터 입력 완료
  const formComplete = (data: UserInfoData) => {
    if(data.id === '') return setBtnActive('deactive');
    if(data.pw === '') return setBtnActive('deactive');
    if(data.phone === '') return setBtnActive('deactive');
    if(data.agreement === false) return setBtnActive('deactive');
    if(idVisible === false) return setBtnActive('deactive');
    if(pwVisible === false) return setBtnActive('deactive');

    return setBtnActive('primary');
  }

  // 데이터 저장 확인
  useEffect(() => {
    formComplete(formData);
    console.log('[DEBUG] formData changed:', formData);
  }, [formData, idVisible, pwVisible]);

  // TODO: 데이터 제출 로직(회원가입 완료)
  const handleJoinClick = () => {
    if(btnActive === 'deactive') {
      console.log('미제출');
    } else {
      console.log('제출');
      navigate('/login');
    }
  }

  return (
    <Container>
      <Content>
        <Title>회원가입</Title>
        <InputForm>
          <SubTitle>필수입력정보</SubTitle>
          <Line width='100%' color={theme.colors.natural[10]} margin='20px' />
          {joinInputOptions.map((opt, index) => (
            <InputBox
              key={index}
              inputLabel={opt.inputLabel}
              inputTitleLabel={opt.inputTitleLabel}
              textLabel={opt.textLabel}
              visible={opt.visible ? (opt.name === 'id' ? idVisible : pwVisible) : true}
              type={opt.type ?? 'text'}
              onChange={opt.name == 'pwCheck' ? handlePwOverlapChange : handleInputChange(opt.name)}
              onBlur={opt.blur ? (opt.name === 'id' ? handleIdCheckBlur : handlePwCheckBlur) : undefined}
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
            />
          ))}
        </DropdownForm>
        <AgreementForm>
          <SubTitle>서비스 이용 약관 동의</SubTitle>
          <Line width='100%' color={theme.colors.natural[10]} margin='20px' />
          <AgreementBox>
            <AgreementTitle>서비스 이용 약관</AgreementTitle>
            <Agreement>
              <AgreementCheck>
                <IconButton
                  icon={formData.agreement ? <CheckBox /> : <CheckBoxOutline />}
                  color={formData.agreement ? theme.colors.primary[100] : theme.colors.natural[20]}
                  onClick={() => setFormData(prev => ({...prev, agreement: !prev.agreement}))}
                />
                <span><strong>[필수]</strong>  서비스 이용약관에 동의합니다.</span>
              </AgreementCheck>
              <Line width='100%' color={theme.colors.natural[20]} />
              <AgreementBody>{agreementText}</AgreementBody>
            </Agreement>
          </AgreementBox>
        </AgreementForm>
        <Button
          label='회원가입'
          variant={btnActive}
          size='lg'
          margin=''
          onClick={handleJoinClick}
        />
      </Content>
    </Container>
  )
}

export default Join