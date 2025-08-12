import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { List } from 'components/molecules';
import { useNavigate } from 'react-router-dom';
import { mypageData } from 'types/mypage.types';
import { useLogin } from 'contexts/LoginContext';
import { deleteCorp, updateCorpe } from 'api/mypageApi';
import { useLoading } from 'contexts/LodingContext';
import { reportOutput } from 'api/reportApi';

interface Props {
  readonly headerList: Array<{label: string, width: string}>;
  readonly widthList: string[];
  readonly notiLabel: string;
  readonly typeList: string[];
  // readonly dataList: string[][];
  // readonly logoList: string[];
  readonly fullData: mypageData;
  readonly reData: () => void;
}

const Container = styled.div`
  // 크기
  width: 100%;
  // 디스플레이
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListCountBox = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: start;
`;

const ListCount = styled.span<{thickness: boolean}>`
  ${({theme, thickness}) => thickness ? typoStyle.subBody.semiBold(theme) : typoStyle.subBody.regular(theme)};
  color: ${({theme}) => theme.colors.natural[80]};
`;

const ListBox = styled.div`
  // 크기
  width: 100%;
  // 스타일
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors.natural[20]};
  overflow: hidden;
`;

const Corporation = ({headerList, widthList, notiLabel, typeList, fullData, reData}: Props) => {
  const navigate = useNavigate();
  const {user} = useLogin();
  // 로딩창
  const {setLoading, setLabel} = useLoading();

  // 빈 함수
  const noop = (e: React.MouseEvent<HTMLElement>, corpCode: string) => {};
  // 메모 수정
  const handleMemoClick = (e: React.MouseEvent<HTMLElement>, corpCode: string, corpName?: string) => {
    const memo = prompt('메모를 입력해주세요.');
    const updateFavoriteCorp = async () => {
      if(user?.userId) {
        try {
          const res = await updateCorpe(user.userId, corpCode ?? '', memo ?? '');
          reData();
          alert('관심기업이 수정되었습니다.');
        } catch (e) {
          alert('수정 실패');
          console.log(corpCode);
        }
      }
    }
    updateFavoriteCorp();
  }
  // 등록 해제
  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>, corpCode: string, corpName?: string) => {
    const deleteFavoriteCorp = async () => {
      if(user?.userId) {
        try {
          const res = await deleteCorp(user.userId, corpCode ?? '');
          reData();
          alert('관심기업이 삭제되었습니다.');
          
        } catch (e) {
          alert('삭제 실패');
          console.log(corpCode);
          
        }
      }
    }
    deleteFavoriteCorp();
  }
  // 리포트 페이지로 이동
  const handleReportClick = async (corpCode: string) => {
      setLabel('리포트를 작성하는 중입니다...');
      setLoading(true);
      try {
          const reportData = await reportOutput(corpCode, user?.riskType ?? '비회원');
          console.log(user?.riskType ?? '비회원');
          console.log('리포트 전체 데이터: ', reportData);
          if (reportData.header === null || reportData.infoBox === null){
              alert('최근 3개년 데이터가 없어 리포트를 제공할 수 없습니다.');
          } else {
              navigate('/report', {state: {reportData: reportData, userType: user?.riskType ?? '비회원'}});
          }
      } catch (e) {
          alert('최근 3개년 데이터가 없어 리포트를 제공할 수 없습니다.');
      } finally {
          setLoading(false);
      }
  }

  // 리스트 안의 버튼 함수
  const btnList: ((e: React.MouseEvent<HTMLElement>, corpCode: string) => void)[] = [noop, noop, handleMemoClick, handleDeleteClick];

  return (
    <Container>
      <ListCountBox>
        <ListCount thickness={true}>{fullData.corpData.length}</ListCount>
        <ListCount thickness={false}>개의 관심기업이 있습니다.</ListCount>
      </ListCountBox>
      <ListBox>
        <List
          headerList={headerList}
          widthList={widthList}
          btnLabel='기업 검색하러 가기'
          notiLabel={notiLabel}
          listOnClick={(e, corpCode) => {handleReportClick(corpCode);}}
          btnList={btnList}
          nullBtnOnClick={() => navigate('/')}
          typeList={typeList}
          dataList={fullData.corpData}
          logoList={fullData.logo}
          corpCodeList={fullData.corpCode}
        />
      </ListBox>
    </Container>
  )
}

export default Corporation