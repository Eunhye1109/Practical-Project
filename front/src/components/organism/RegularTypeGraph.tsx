import React from 'react'
import styled from '@emotion/styled'
import { stableType, stableTypeBodyText, stableTypeTitle } from 'constants/graphOption';
import { GraphBox } from 'components/molecules';
import { Button } from 'components/atoms';
import { typoStyle } from 'styles/typoStyle';
import { useNavigate } from 'react-router-dom';
import { ReportFullData } from 'types/report.types';

interface Prop {
  data: ReportFullData;
}

const Container = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    box-sizing: border-box;
    position: relative;
`;

const LineContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const SmContent = styled.div`
  width: calc(25% - 10px);
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const ButtonBox = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    padding: 20px 30px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.4);
`;

const BodyText = styled.p`
    ${({theme}) => typoStyle.body.semiBold(theme)}
    color: ${({theme}) => theme.colors.primary[110]};
`;

const RegularTypeGraph = ({data}: Prop) => {
    const navigate = useNavigate();
    const typeList = ['group', 'line', 'stack', 'composite']
    const unitList = ['원', '%', '원', '%']
  return (
    <Container>
        <LineContent>
            <GraphBox type={typeList[0]} titleLable={stableTypeTitle[0]} textType={0} data={data.graphData} graphList={stableType[0]} tooltipId={'tip00'} bodyText={stableTypeBodyText} unit={unitList[0]} size={'lg'} height={300} aiSummary={'가짜 데이터입니다. 이 데이터는 이러이러한 근거를 바탕으로 이러이러한 내용의 분석 결과를 알 수 있다.'} boxBlur={true} />
            <SmContent>
                <GraphBox type={typeList[1]} titleLable={stableTypeTitle[1]} textType={1} data={data.graphData} graphList={stableType[1]} tooltipId={'tip01'} bodyText={stableTypeBodyText} unit={unitList[1]} size={'sm'} aiSummary={''} boxBlur={true} />
                <GraphBox type={typeList[2]} titleLable={stableTypeTitle[2]} textType={2} data={data.graphData} graphList={stableType[2]} tooltipId={'tip02'} bodyText={stableTypeBodyText} unit={unitList[2]} size={'sm'} aiSummary={''} boxBlur={true} />
            </SmContent>
        </LineContent>
        <ButtonBox>
            <BodyText>지금 로그인하고 전체 재무 구조를 한눈에 확인해보세요.</BodyText>
            <Button label={'로그인'} variant={'primary'} size={'md'} onClick={() => navigate('/login')} />
        </ButtonBox>
        {/* {regularTypeTitle.map((item, index) => (
            <GraphBox type={typeList[index]} titleLable={item} textType={index + 1} data={dummyData} graphList={regularType[index + 1]} tooltipId={'tip' + index} bodyText={regularTypeBodyText} unit={unitList[index]} />
        ))}

        <BlurBox>
            <div style={{filter: 'blur(5px)', width: '100%', opacity: '0.5', pointerEvents: 'none'}}>
                <GraphBox type={'group'} titleLable={'영업 수익률과 최종 수익률 구조 비교'} textType={3} data={dummyData} graphList={regularType[3]} tooltipId={undefined} unit='%' bodyText={regularTypeBodyText} />
            </div>
            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px'}}>
                <BodyText>지금 로그인하고 전체 재무 구조를 한눈에 확인해보세요.</BodyText>
                <Button label={'로그인'} variant={'primary'} size={'md'} onClick={() => navigate('/login')} />
            </div>
        </BlurBox> */}
    </Container>
  )
}

export default RegularTypeGraph