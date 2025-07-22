import React from 'react'
import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

type Props = {
    children: ReactNode;
}

const MainLayout: FC<Props> = ({children}) => {
  // 특정 페이지에서 footer 안보이게 설정
  const location = useLocation();
  const hidePath = ['/'];
  const footerVisible = !hidePath.includes(location.pathname);

  return (
    <>
        <Header logoTitle='요즘기업 보고서' />
        {children}
        {footerVisible && <Footer logoTitle='요즘기업 보고서' />}
    </>
  )
}

export default MainLayout