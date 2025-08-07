import React from 'react'
import styled from '@emotion/styled'
import { regularType, regularTypeBodyText, regularTypeTitle } from 'constants/graphOption';
import { GraphBox } from 'components/molecules';
import { dummyData } from 'constants/graphDummyData';
import { Button } from 'components/atoms';
import { typoStyle } from 'styles/typoStyle';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    // 디스플레이
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
    box-sizing: border-box;
`;

const BlurBox = styled.div`
    width: 100%;
    position: relative; 
`;

const BodyText = styled.p`
    ${({theme}) => typoStyle.body.semiBold(theme)}
    color: ${({theme}) => theme.colors.natural[80]};
`;

const RegularTypeGraph = () => {
    const navigate = useNavigate();
    const typeList = ['group', 'line', 'stack', 'composite']
    const unitList = ['원', '%', '원', '%']
  return (
    <Container>
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