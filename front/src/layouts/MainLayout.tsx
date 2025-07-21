import React from 'react'
import { FC, ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
    children: ReactNode;
}

const MainLayout: FC<Props> = ({children}) => {
  return (
    <>
        <Header logoTitle='요즘기업 보고서' />
        {children}
        <Footer logoTitle='요즘기업 보고서' />
    </>
  )
}

export default MainLayout