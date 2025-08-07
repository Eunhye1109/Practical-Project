import React from 'react'
import { GraphBox } from 'components/molecules';
import { dummyData } from 'constants/graphDummyData';
import { adminType, adminTypeBodyText, adminTypeTitle } from 'constants/graphOption';
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

const AdminTypeGraph = () => {
  const typeList = ['line', 'line', 'group', 'stack', 'composite', 'group', 'composite', 'group']
  const unitList = ['%', '원', '%', '원', '%', '원', '%', '원']
  return (
    <Container>
        {/* {adminTypeTitle.map((item, index) => (
          <GraphBox type={typeList[index]} titleLable={item} textType={index + 1} data={dummyData} graphList={adminType[index + 1]} tooltipId={'tip' + index} bodyText={adminTypeBodyText} unit={unitList[index]} />
        ))} */}
    </Container>
  )
}

export default AdminTypeGraph