import React from 'react'
import { GraphBox } from 'components/molecules';
import { dummyData } from 'constants/graphDummyData';
import { adminType, adminTypeBodyText, adminTypeTitle } from 'constants/graphOption';
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

const AdminTypeGraph = ({data, showIndex}: Prop) => {
  const typeList = ['group', 'group', 'composite', 'group']
  const unitList = ['%', '%', '원', '%']
  return (
    <Container>
        {/* 조합1 */}
        {(showIndex === undefined || showIndex[0] === true) && (
       <LineContent>
        <GraphBox type={typeList[0]} titleLable={adminTypeTitle[0]} textType={0} data={data.graphData} graphList={adminType[0]} tooltipId={'tip00'} bodyText={adminTypeBodyText} unit={unitList[0]} size={'xl'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
       </LineContent>
        )}
       {/* 조합2 */}
       {(showIndex === undefined || showIndex[1] === true) && (
       <LineContent>
        <GraphBox type={typeList[1]} titleLable={adminTypeTitle[1]} textType={1} data={data.graphData} graphList={adminType[1]} tooltipId={'tip01'} bodyText={adminTypeBodyText} unit={unitList[1]} size={'md'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
        <GraphBox type={typeList[2]} titleLable={adminTypeTitle[2]} textType={2} data={data.graphData} graphList={adminType[2]} tooltipId={'tip02'} bodyText={adminTypeBodyText} unit={unitList[2]} size={'md'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
       </LineContent>
       )}
       {/* 조합3 */}
       {(showIndex === undefined || showIndex[2] === true) && (
       <LineContent>
        <GraphBox type={typeList[3]} titleLable={adminTypeTitle[3]} textType={3} data={data.graphData} graphList={adminType[3]} tooltipId={'tip03'} bodyText={adminTypeBodyText} unit={unitList[3]} size={'xl'} height={300} aiSummary={'data.aiGraphSummary[0] ?? '} />
       </LineContent>
       )}
    </Container>
  )
}

export default AdminTypeGraph