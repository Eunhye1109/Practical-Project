import React from 'react'
import { GraphBox } from 'components/molecules';
import { dummyData } from 'constants/graphDummyData';
import { attackType, attackTypeBodyText, attackTypeTitle } from 'constants/graphOption';
import styled from '@emotion/styled';

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

const AttackTypeGraph = () => {
  const typeList = ['line', 'group', 'group', 'composite', 'stack', 'line', 'stack', 'pie']
  const unitList = ['%', '원', '%', '원', '%', '원', '%', '원']
  return (
    <Container>
        {/* {attackTypeTitle.map((item, index) => (
          <GraphBox type={typeList[index]} titleLable={item} textType={index + 1} data={dummyData} graphList={attackType[index + 1]} tooltipId={'tip' + index} bodyText={attackTypeBodyText} unit={unitList[index]} />
        ))} */}
    </Container>
  )
}

export default AttackTypeGraph