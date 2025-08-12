import React from 'react'
import { GraphBox } from 'components/molecules';
import { dummyData } from 'constants/graphDummyData';
import { attackType, attackTypeBodyText, attackTypeTitle } from 'constants/graphOption';
import styled from '@emotion/styled';
import { ReportFullData } from 'types/report.types';

interface Prop {
  data: ReportFullData;
  showIndex?: boolean[];
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

const AttackTypeGraph = ({data, showIndex}: Prop) => {
  const typeList = ['composite', 'bar', 'bar', 'group', 'bar', 'group']
  const unitList = ['원', '%', '%', '%', '원', '%']
  return (
    <Container>
        {/* 조합1 */}
        {(showIndex === undefined || showIndex[0] === true) && (
        <LineContent>
          <GraphBox type={typeList[0]} titleLable={attackTypeTitle[0]} textType={0} data={data.graphData} graphList={attackType[0]} tooltipId={'tip00'} bodyText={attackTypeBodyText} unit={unitList[0]} size={'lg'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
          <SmContent>
            <GraphBox type={typeList[1]} titleLable={attackTypeTitle[1]} textType={1} data={data.graphData} graphList={attackType[1]} tooltipId={'tip01'} bodyText={attackTypeBodyText} unit={unitList[1]} size={'sm'} aiSummary={''} />
            <GraphBox type={typeList[2]} titleLable={attackTypeTitle[2]} textType={2} data={data.graphData} graphList={attackType[2]} tooltipId={'tip02'} bodyText={attackTypeBodyText} unit={unitList[2]} size={'sm'} aiSummary={''} />
          </SmContent>
        </LineContent>
      )}
      {/* 조합2 */}
      {(showIndex === undefined || showIndex[1] === true) && (
      <LineContent>
        <GraphBox type={typeList[3]} titleLable={attackTypeTitle[3]} textType={3} data={data.graphData} graphList={attackType[3]} tooltipId={'tip03'} bodyText={attackTypeBodyText} unit={unitList[3]} size={'md'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
        <GraphBox type={typeList[4]} titleLable={attackTypeTitle[4]} textType={4} data={data.graphData} graphList={attackType[4]} tooltipId={'tip04'} bodyText={attackTypeBodyText} unit={unitList[4]} size={'md'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
      </LineContent>
      )}
      {/* 조합3 */}
      {(showIndex === undefined || showIndex[2] === true) && (
      <GraphBox type={typeList[5]} titleLable={attackTypeTitle[5]} textType={5} data={data.graphData} graphList={attackType[5]} tooltipId={'tip05'} bodyText={attackTypeBodyText} unit={unitList[5]} size={'xl'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
    )}
    </Container>
  )
}

export default AttackTypeGraph