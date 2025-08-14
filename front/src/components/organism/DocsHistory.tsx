import React from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import { useNavigate } from 'react-router-dom';
import { List } from 'components/molecules';
import { mypageData } from 'types/mypage.types';

interface Props {
  readonly headerList: Array<{label: string, width: string}>;
  readonly widthList: string[];
  readonly notiLabel: string;
  readonly typeList: string[];
  // readonly dataList: string[][];
  // readonly logoList: string[];
  readonly fullData: mypageData;
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

const DocsHistory = ({headerList, widthList, notiLabel, typeList, fullData}: Props) => {
  const navigate = useNavigate();

  // 빈 함수
  const noop = (e: React.MouseEvent<HTMLElement>) => {};
  // 관심 등록
  const handleMemoClick = (e: React.MouseEvent<HTMLElement>) => {
    alert('관심등록');
  }
  // 보고서 다운로드
  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    alert('보고서다운');
  }
  // 리포트 페이지로 이동
  const handleReportClick = (e: React.MouseEvent<HTMLElement>) => {

  }

  // 리스트 안의 버튼 함수
  const btnList: ((e: React.MouseEvent<HTMLElement>) => void)[] = [noop, noop, handleMemoClick, handleDeleteClick];

  return (
    <Container>
      <ListCountBox>
        <ListCount thickness={false}>최근 3개월 이내에 <ListCount thickness={true}>{fullData.corpData.length}</ListCount>개 기업을 조회했습니다.</ListCount>
      </ListCountBox>
      <ListBox>
        <List
          headerList={headerList}
          widthList={widthList}
          btnLabel='기업 검색하러 가기'
          notiLabel={notiLabel}
          listOnClick={handleReportClick}
          btnList={btnList}
          nullBtnOnClick={() => navigate('/')}
          dataList={fullData.corpData}
          typeList={typeList}
          logoList={fullData.logo}
          corpCodeList={fullData.corpCode}
        />
      </ListBox>
    </Container>
  )
}

export default DocsHistory