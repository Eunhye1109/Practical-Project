import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { List, SearchBar } from 'components/molecules';
import { dropdownOption, modeOption, headerList, allItemList, widthList } from '../constants/searchResultOption';
import TextButton from 'components/atoms/textButton/TextButton';

const Container = styled.div`
    // 크기
    width: 100%;
    min-height: 100vh;
    margin-top: 60px;
    // 디스클레이
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    // 스타일
    background-color: ${({theme}) => theme.colors.primary[20]};
`;

const TopPanner = styled.div<{fixed: boolean}>`
    // 크기
    width: 100%;
    padding: 25px 0;
    // 디스플레이
    position: fixed;
    top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    z-index: 1000;
    // 스타일
    background-color: white;
    border-bottom: 1px solid ${({theme}) => theme.colors.natural[20]};
    box-shadow: 0px 5px 10px 0px rgba(150, 150, 150, 0.1);
`;

const PannerTitleBox = styled.div`
    // 디스플레이
    display: flex;
    gap: 10px;
`;

const PannerTitle = styled.span<{titleStyle: boolean, size: boolean}>`
    ${({theme, titleStyle, size}) => titleStyle ? (size ? typoStyle.subTitle2.bold(theme) : typoStyle.subTitle.bold(theme)) : (size ? typoStyle.subTitle2.regular(theme) : typoStyle.subTitle.regular(theme))};
    color: ${({theme, titleStyle}) => titleStyle ? theme.colors.primary[100] : theme.colors.natural[70]};
`;

const SearchBarBox = styled.div<{fixed: boolean}>`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${({fixed}) => fixed ? 1000 : 0};
    // 위치
    margin-top: ${({fixed}) => fixed ? '60px' : '100px'};
    position: ${({fixed}) => fixed ? 'fixed' : undefined};
    // 스타일
    background-color: ${({fixed}) => fixed ? 'white' : undefined};
    padding-bottom: ${({fixed}) => fixed ? '30px' : '0'};
    border-bottom: ${({fixed, theme}) => fixed ? `1px solid ${theme.colors.natural[20]}` : 'none'};
    box-shadow: ${({fixed}) => fixed ? '0px 5px 10px 0px rgba(150, 150, 150, 0.1)' : undefined};
`;

const Content = styled.div<{fixed: boolean}>`
    // 크기
    width: 85%;
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    // 위치
    margin-top: ${({fixed}) => fixed ? '250px' : '50px'};
    margin-bottom: ${({fixed}) => fixed ? '100px' : '0px'};
`;

const SearchControllBar = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SearchCount = styled.span`
    ${({theme}) => typoStyle.subBody.regular(theme)};
`;

const SearchCountBold = styled.span`
    ${({theme}) => typoStyle.subBody.semiBold(theme)};
`;

const SortBox = styled.div`
    display: flex;
    gap: 5px;
`;

const SearchListBox = styled.div`
    // 크기
    width: 100%;
    // 디스플레이
    overflow: hidden;
    box-sizing: border-box;
    // 스타일
    background-color: white;
    border-radius: 5px;
    border: 1px solid ${({theme}) => theme.colors.natural[20]};
`;

const SearchResult = () => {
    // 스크롤 이벤트 관리
    const [scrolled, setScrolled] = useState(false);
    // 검색 결과 건수
    const [searchCount, setSearchCount] = useState('12312');
    // 정렬 버튼 컨트롤
    const [sortBtn, setSortBtn] = useState(['selected', 'default']);
    // 정렬 방식 리스트
    const sortList = ['정렬1', '정렬2'];

    // 정렬 변경 함수
    const handleSortClick = (clickIndex: number) => {
        setSortBtn(prev => prev.map((_, index) => index === clickIndex ? 'selected' : 'default'))
    }

    // SearchBar 위치 조정
    useEffect(() => {
        const handleSearchBar = () => {
        const scrollTop = window.scrollY;
        setScrolled(scrollTop >= 80);  // 스크롤 80 이하일 때 true, 초과면 false
    };

    // 초기 상태 설정
    handleSearchBar();
    window.addEventListener('scroll', handleSearchBar);

    return () => {
        window.removeEventListener('scroll', handleSearchBar)
    }
    }, []);

    // 정렬 변경 반영
    useEffect(() => {
        // TODO: 정렬에 맞게 다시 리스트 로딩
    }, [sortBtn]);

  return (
    <Container>
        <TopPanner fixed={scrolled}>
            <PannerTitleBox>
                <PannerTitle titleStyle={true} size={scrolled}>검색어</PannerTitle>
                <PannerTitle titleStyle={false} size={scrolled}>검색결과</PannerTitle>
            </PannerTitleBox>
        </TopPanner>
        <SearchBarBox fixed={scrolled}>
            <SearchBar
                itemList={dropdownOption}
                modeList={modeOption}
                label='기업명을 입력해주세요.'
                width='80%'
            />
        </SearchBarBox>
        <Content fixed={scrolled}>
            <SearchControllBar>
                <SearchCount>검색 결과 <SearchCountBold>{searchCount}</SearchCountBold> 건</SearchCount>
                <SortBox>
                    {sortList.map((sort, index) => (
                        <TextButton key={index} label={sort} mode={sortBtn[index]} onClick={() => handleSortClick(index)} />
                    ))}
                </SortBox>
            </SearchControllBar>
            <SearchListBox>
                <List headerList={headerList} allItemList={allItemList} widthList={widthList} />
            </SearchListBox>
        </Content>
    </Container>
  )
}

export default SearchResult