import styled from '@emotion/styled'
import React from 'react'
import { title1Bold, title1Regular, title2Bold, title2Regular, body1SemiBold, body1Regular, body2SemiBold, body2Regular, caption1Light, caption2Light, caption1Regular, caption2Regular } from 'styles/typoStyle'

const TSt01 = styled.p`
  ${({theme}) => title1Bold(theme)}
`;

const TSt02 = styled.p`
  ${({theme}) => title1Regular(theme)}
`;

const TSt03 = styled.p`
  ${({theme}) => title2Bold(theme)}
`;

const TSt04 = styled.p`
  ${({theme}) => title2Regular(theme)}
`;

const TSt05 = styled.p`
  ${({theme}) => body1SemiBold(theme)}
`;

const TSt06 = styled.p`
  ${({theme}) => body1Regular(theme)}
`;

const TSt07 = styled.p`
  ${({theme}) => body2SemiBold(theme)}
`;

const TSt08 = styled.p`
  ${({theme}) => body2Regular(theme)}
`;

const TSt09 = styled.p`
  ${({theme}) => caption1Regular(theme)}
`;

const TSt10 = styled.p`
  ${({theme}) => caption1Light(theme)}
`;

const TSt11 = styled.p`
  ${({theme}) => caption2Regular(theme)}
`;

const TSt12 = styled.p`
  ${({theme}) => caption2Light(theme)}
`;

const Home = () => {
  return (
    <div>
      <TSt01>title1Bold</TSt01>
      <TSt02>title1Regular</TSt02>
      <TSt03>title2Bold</TSt03>
      <TSt04>title2Regular</TSt04>
      <TSt05>body1SemiBold</TSt05>
      <TSt06>body1Regular</TSt06>
      <TSt07>body2SemiBold</TSt07>
      <TSt08>body2Regular</TSt08>
      <TSt09>caption1Regular</TSt09>
      <TSt10>caption1Light</TSt10>
      <TSt11>caption2Regular</TSt11>
      <TSt12>caption2Light</TSt12>
    </div>
  )
}

export default Home