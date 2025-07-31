import React from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { List } from 'components/molecules';
import { useNavigate } from 'react-router-dom';

interface Props {
  readonly headerList: Array<{label: string, width: string}>;
  readonly allItemList: Array<{name: string, src: string, itemList: Array<{type: string, data: string[]}>}>;
  readonly widthList: string[];
  readonly notiLabel: string;
  readonly onClick?: (value: React.ReactNode) => void;
  readonly btnOnClick?: () => void;
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

const Corporation = ({headerList, allItemList, widthList, notiLabel, onClick, btnOnClick}: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ListCountBox>
        <ListCount thickness={true}>{allItemList.length}</ListCount><ListCount thickness={false}>개의 관심기업이 있습니다.</ListCount>
      </ListCountBox>
      <ListBox>
        <List headerList={headerList} allItemList={allItemList} widthList={widthList} btnLabel='기업 검색하러 가기' notiLabel={notiLabel} onClick={() => onClick} btnOnClick={() => btnOnClick} nullBtnOnClick={() => navigate('/')} />
      </ListBox>
    </Container>
  )
}

export default Corporation