import React from 'react'
import styled from '@emotion/styled';
import { typoStyle } from 'styles/typoStyle';
import { useNavigate } from 'react-router-dom';
import { List } from 'components/molecules';

interface Props {
  readonly headerList: Array<{label: string, width: string}>;
  readonly widthList: string[];
  readonly notiLabel: string;
  readonly onClick?: (value: React.ReactNode) => void;
  readonly btnOnClick?: () => void;
  readonly typeList: string[];
  readonly dataList: string[][];
  readonly logoList: string[];
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

const DocsHistory = ({headerList, widthList, notiLabel, onClick, btnOnClick, dataList, logoList, typeList}: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ListCountBox>
        <ListCount thickness={false}>최근 3개월 이내에 <ListCount thickness={true}>{dataList.length}</ListCount>개 기업을 조회했습니다.</ListCount>
      </ListCountBox>
      <ListBox>
        <List
          headerList={headerList}
          widthList={widthList}
          btnLabel='기업 검색하러 가기'
          notiLabel={notiLabel}
          listOnClick={() => onClick}
          btnOnClick={() => btnOnClick}
          nullBtnOnClick={() => navigate('/')}
          dataList={dataList}
          typeList={typeList}
          logoList={logoList}
          corpCodeList={[]}
        />
      </ListBox>
    </Container>
  )
}

export default DocsHistory