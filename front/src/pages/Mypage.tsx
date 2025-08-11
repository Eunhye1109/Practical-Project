import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSearchParams } from 'react-router-dom';
import Corporation from 'components/organism/Corporation';
import DocsHistory from 'components/organism/DocsHistory';
import UserInfoSetting from 'components/organism/UserInfoSetting';
import Withdrawal from 'components/organism/Withdrawal';
import { typoStyle } from 'styles/typoStyle';
import { Line } from 'components/atoms';
import { useTheme } from '@emotion/react';
import { nullList, corWidthList, corHeaderList, docsHistoryDummyData, docsWidthList, docsHeaderList, corTypeList, docsTypeList, docsDummyDataList, favoriteDummyData } from '../constants/mypageDummyData';
import { useLogin } from 'contexts/LoginContext';
import { mypageData } from 'types/mypage.types';
import { selectCorp } from 'api/mypageApi';

const Container = styled.div`
    // 크기
    width: 100%;
    min-height: calc(100vh - 100px);
    // 디스플레이
    display: flex;
    justify-content: center;
    align-items: start;
    // 스타일
    background-color: ${({theme}) => theme.colors.primary[20]};
`;

const TopPanner = styled.div`
    // 크기
    width: 100%;
    padding: 25px 0 0 0;
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

const PannerTitle = styled.p`
    ${({theme}) => typoStyle.subTitle.regular(theme)};
    color: ${({theme}) => theme.colors.natural[70]};
    margin-bottom: 10px;
`;

const TabBox = styled.div`
    // 크기
    width: 50%;
    // 디스플레이
    display: flex;
    align-items: center;
    position: relative;
`;

const TabItem = styled.div<{selected: boolean}>`
    // 크기
    width: 33.33%;
    // 디스플레이
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    position: relative;
    text-align: center;
    // 스타일
    ${({theme, selected}) => selected ? typoStyle.body.semiBold(theme) : typoStyle.body.regular(theme)}
    color: ${({theme, selected}) => selected ? theme.colors.primary[80] : theme.colors.natural[40]};
    cursor: pointer;

    transition: 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
        color: ${({theme}) => theme.colors.primary[80]};
    }
`;

const Content = styled.div<{width: string}>`
    // 크기
    width: ${({width}) => width};
    // 디스플레이
    display: flex;
    justify-content: center;
    // 위치
    margin-top: 240px;
    margin-bottom: 100px;
`;

const Mypage = () => {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const itemList = ['관심기업', '내 정보 수정', '회원탈퇴'];
    const defaultTab = parseInt(searchParams.get('tab') ?? '0'); // 기본값은 0번 탭
    const {user} = useLogin();
    // 관심기업 리스트
    const [data, setData] = useState<mypageData>({
        logo: [],
        corpData: [],
        corpCode: []
    });

    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        setSearchParams({ tab: String(index) });
    };

    // tab 파라미터가 변경될 때마다 activeTab 업데이트
    useEffect(() => {
        const tabParam = parseInt(searchParams.get('tab') ?? '0');
        setActiveTab(tabParam);
    }, [searchParams]);

    // 관심 기업 조회 함수
    const selectFavoriteCorp = async () => {
        if(user?.userId) {
            try {
            const res = await selectCorp(user.userId);
            const fullData = res.fcVOList;
            const newData: mypageData = {
                logo: fullData.map((item: { logoUrl: string }) => item.logoUrl),
                corpData: fullData.map((item: { corpName: string; corpSummary: string; u_comment: string }) => [
                    item.corpName,
                    item.corpSummary,
                    item.u_comment
                ]),
                corpCode: fullData.map((item: { corpCode: string }) => item.corpCode)
            };
            // 관심기업 데이터 가공
            newData.corpData.forEach(item => {
                item.push('수정', '해제');
            })
            setData(newData);
            console.log('전체 데이터: ', res);
            console.log('배열에 있는 데이터: ', fullData);
            console.log('최종 데이터: ', data);
            } catch (e) {
            console.log('실패');
            }
        }
    }
    // 관심기업 조회
    useEffect(() => {
        selectFavoriteCorp();
    }, [user?.userId])

    docsHistoryDummyData.corpData.forEach(item => {
        item.push('등록', '다운');
    })
    
  return (
    <Container>
        <TopPanner>
            <PannerTitle>마이페이지</PannerTitle>
            <TabBox>
                {itemList.map((item, index) => (
                    <TabItem selected={activeTab === index ? true : false} onClick={() => handleTabChange(index)}>
                        {item}
                        <Line opacity={activeTab === index ? '1' : '0'} width='100%' color={theme.colors.primary[80]} thickness='2px' />
                    </TabItem>
                ))}
            </TabBox>
        </TopPanner>
        <Content width='80%'>
            {activeTab === 0 && <Corporation
                headerList={corHeaderList}
                widthList={corWidthList}
                notiLabel='아직 등록된 관심기업이 없습니다.'
                typeList={corTypeList}
                fullData={data}
                reData={selectFavoriteCorp}
            />}
            {/* {activeTab === 1 && <DocsHistory
                headerList={docsHeaderList}
                widthList={docsWidthList}
                notiLabel='최근 3개월 이내에 조회한 기업이 없습니다.'
                typeList={docsTypeList}
                fullData={docsHistoryDummyData}
            />} */}
            {activeTab === 1 && <UserInfoSetting />}
            {activeTab === 2 && <Withdrawal />}
        </Content>
    </Container>
  )
}

export default Mypage