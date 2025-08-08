import React from 'react'
import styled from '@emotion/styled'
import { stableType, stableTypeBodyText, stableTypeTitle } from 'constants/graphOption';
import { GraphBox } from 'components/molecules';
import { ReportFullData } from 'types/search.types';

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

const MdContent = styled.div`
  width: calc(50% - 10px);
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const StableTypeGraph = ({data}: Prop) => {
  const typeList = ['composite', 'bar', 'line', 'group', 'bar', 'bar', 'line', 'bar', 'group']
  const unitList = ['%', '원', '원', '%', '원', '원', '원', '%', '%']
  return (
    <Container>
      {/* 조합1 */}
      <LineContent>
        <GraphBox type={typeList[0]} titleLable={stableTypeTitle[0]} textType={0} data={data.graphData} graphList={stableType[0]} tooltipId={'tip00'} bodyText={stableTypeBodyText} unit={unitList[0]} size={'lg'} height={200} aiSummary={data.aiGraphSummary[0]} />
        <SmContent>
          <GraphBox type={typeList[1]} titleLable={stableTypeTitle[1]} textType={1} data={data.graphData} graphList={stableType[1]} tooltipId={'tip01'} bodyText={stableTypeBodyText} unit={unitList[1]} size={'sm'} aiSummary={''} />
          <GraphBox type={typeList[2]} titleLable={stableTypeTitle[2]} textType={2} data={data.graphData} graphList={stableType[2]} tooltipId={'tip02'} bodyText={stableTypeBodyText} unit={unitList[2]} size={'sm'} aiSummary={''} />
        </SmContent>
      </LineContent>

      {/* 조합2 */}
      <LineContent>
        <GraphBox type={typeList[3]} titleLable={stableTypeTitle[3]} textType={3} data={data.graphData} graphList={stableType[3]} tooltipId={'tip03'} bodyText={stableTypeBodyText} unit={unitList[3]} size={'md'} height={200} aiSummary={data.aiGraphSummary[1]} />
        <SmContent>
          <GraphBox type={typeList[4]} titleLable={stableTypeTitle[4]} textType={4} data={data.graphData} graphList={stableType[4]} tooltipId={'tip04'} bodyText={stableTypeBodyText} unit={unitList[4]} size={'sm'} aiSummary={''} />
          <GraphBox type={typeList[5]} titleLable={stableTypeTitle[5]} textType={5} data={data.graphData} graphList={stableType[5]} tooltipId={'tip05'} bodyText={stableTypeBodyText} unit={unitList[5]} size={'sm'} aiSummary={''} />
        </SmContent>
        <SmContent>
          <GraphBox type={typeList[6]} titleLable={stableTypeTitle[6]} textType={6} data={data.graphData} graphList={stableType[6]} tooltipId={'tip06'} bodyText={stableTypeBodyText} unit={unitList[6]} size={'sm'} aiSummary={''} />
          <GraphBox type={typeList[7]} titleLable={stableTypeTitle[7]} textType={7} data={data.graphData} graphList={stableType[7]} tooltipId={'tip07'} bodyText={stableTypeBodyText} unit={unitList[7]} size={'sm'} aiSummary={''} />
        </SmContent>
      </LineContent>

      {/* 조합3 */}
      <GraphBox type={typeList[8]} titleLable={stableTypeTitle[8]} textType={8} data={data.graphData} graphList={stableType[8]} tooltipId={'tip08'} bodyText={stableTypeBodyText} unit={unitList[8]} size={'xl'} height={300} aiSummary={data.aiGraphSummary[2]} />
    </Container>
  )
}

export default StableTypeGraph