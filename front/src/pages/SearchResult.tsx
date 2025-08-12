import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled'
import { typoStyle } from 'styles/typoStyle';
import { List, SearchBar, SearchInput } from 'components/molecules';
import { dropdownOption, modeOption, headerList, typeList, widthList } from '../constants/searchResultOption';
import { reportOutput } from 'api/reportApi';
import { useLogin } from 'contexts/LoginContext';
import { hisKeyword, saveKeyword, searchCorp } from 'api/searchApi';
import { useLoading } from 'contexts/LodingContext';
import { Search } from 'assets/icons';

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
    flex-direction: column;
    gap: 10px;
    z-index: ${({fixed}) => fixed ? 1000 : 0};
    // 위치
    margin-top: ${({fixed}) => fixed ? '60px' : '110px'};
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

const ReSearchKeywordBox = styled.div`
  display: flex;
  gap: 10px;
`;

const ReSearchKeyword = styled.span<{thick: boolean}>`
  ${({theme, thick}) => thick ? typoStyle.subBody.semiBold(theme) : typoStyle.subBody.regular(theme)};
  cursor: ${({thick}) => thick ? 'default' : 'pointer'};
  color: ${({theme}) => theme.colors.primary[110]};

  :hover {
    text-decoration: ${({thick}) => thick ? 'none' : 'underline'};
  }
`;
const ReSearchKeywordContent = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchResult = () => {
    // 검색 결과 관련
    const location = useLocation();
    const navigate = useNavigate();
    const [searchRes, setSearchRes] = useState(location.state?.res);
    const [codeList, setCodeList] = useState(location.state?.code);
    const [logoList, setLogoList] = useState(location.state?.logo);
    const [searchCorpName, setSearchCorpName] = useState(location.state?.corpName);
    const {user} = useLogin();
    // 로딩창
    const {setLoading, setLabel} = useLoading();

    // 스크롤 이벤트 관리
    const [scrolled, setScrolled] = useState(false);
    // 정렬 버튼 컨트롤
    const [sortBtn, setSortBtn] = useState(['selected', 'default']);
    // 정렬 방식 리스트
    //const sortList = ['정렬1', '정렬2'];
    // 타이틀 검색어
    const [searchTitle, setSearchTitle] = useState(searchCorpName);
    // 최근 검색어 저장
    const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

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

    // 최근 검색어 불러오기
    useEffect(() => {
        const fetchKeyword = async () => {
            if(user?.userId) {
                try {
                    const res = await hisKeyword(user.userId);
                    const list: string[] = [];
                    {res.map((item) => (
                    list.push(item.searchWord)
                    ))}
                    setRecentKeywords(list);
                } catch (e) {
                    alert('불러오기 실패')
                }
            }
        }
        fetchKeyword();
    }, [user]);

    // 기업 선택 -> 리포트 화면 이동
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
            console.log(codeList);
        } finally {
            setLoading(false);
        }
    }

    const fetchKeyword = async () => {
          if(user?.userId) {
            try {
              const res = await hisKeyword(user.userId);
              const list: string[] = [];
              {res.map((item) => (
                list.push(item.searchWord)
              ))}
              setRecentKeywords(list);
            } catch (e) {
              alert('불러오기 실패')
            }
          }
        }

    // 검색
    const handleSearchClick = async () => {
        setLabel('기업들을 찾아보는 중입니다...');
        setLoading(true);
        try {
            fetchKeyword();
            const searchDataList = await searchCorp(searchCorpName);
            if(user?.userId && recentKeywords.every(item => item !== searchCorpName)) {
                const save = await saveKeyword(user?.userId, searchCorpName);
            }
            const dataList: any[][] = [];
            const codeList: any[] = [];
            const logoList: any[] = [];

            searchDataList.forEach(item => {
                const values = Object.values(item);
                const firstValue = values[0];
                const lastValue = values[values.length - 1];

                dataList.push(values.slice(1, values.length - 1));
                codeList.push(lastValue);
                logoList.push(firstValue);
                console.log('밸류: ', values);
                console.log('데이터: ', dataList);
                console.log('코드: ', codeList);
                console.log('로고: ', logoList);
                
            });
            setSearchRes(dataList);
            setCodeList(codeList);
            setLogoList(logoList);
            setSearchTitle(searchCorpName);
        } catch (e) {
            alert('실패~~~');
        } finally {
            setLoading(false);
        }
    }

  return (
    <Container>
        <TopPanner fixed={scrolled}>
            <PannerTitleBox>
                <PannerTitle titleStyle={true} size={scrolled}>{searchTitle}</PannerTitle>
                <PannerTitle titleStyle={false} size={scrolled}>검색결과</PannerTitle>
            </PannerTitleBox>
        </TopPanner>
        <SearchBarBox fixed={scrolled}>
            <SearchInput
                width='50%'
                label='기업명을 입력해주세요.'
                icon={<Search width='100%' height='100%' />}
                onClick={handleSearchClick}
                onChange={(e) => {setSearchCorpName(e.target.value)}}
                value={searchCorpName}
                align='left'
            />
            {user ?
            <ReSearchKeywordBox>
                <ReSearchKeyword thick={true}>최근 검색어 | </ReSearchKeyword>
                <ReSearchKeywordContent>
                {recentKeywords.map((item) => (
                    <ReSearchKeyword thick={false} onClick={() => setSearchCorpName(item)}>{item}</ReSearchKeyword>
                ))}
                </ReSearchKeywordContent>
            </ReSearchKeywordBox> :
            undefined
            }
        </SearchBarBox>
        <Content fixed={scrolled}>
            <SearchControllBar>
                <SearchCount>검색 결과 <SearchCountBold>{searchRes.length}</SearchCountBold> 건</SearchCount>
                {/* <SortBox>
                    {sortList.map((sort, index) => (
                        <TextButton key={index} label={sort} mode={sortBtn[index]} onClick={() => handleSortClick(index)} />
                    ))}
                </SortBox> */}
            </SearchControllBar>
            <SearchListBox>
                <List
                    typeList={typeList}
                    headerList={headerList}
                    widthList={widthList}
                    dataList={searchRes}
                    logoList={logoList}
                    corpCodeList={codeList}
                    listOnClick={(e, corpCode) => {handleReportClick(corpCode);}}
                />
            </SearchListBox>
        </Content>
    </Container>
  )
}

export default SearchResult