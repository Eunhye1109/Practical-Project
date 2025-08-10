import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginProvider } from 'contexts/LoginContext';
import { LoadingProvider, useLoading } from 'contexts/LodingContext';
import Loading from 'components/atoms/loading/Loading';

// Layouts import
import MainLayout from 'layouts/MainLayout';

// Pages import
import Home from 'pages/Home';
import Login from 'pages/Login';
import Join from 'pages/Join';
import styled from '@emotion/styled';
import SearchResult from 'pages/SearchResult';
import Mypage from 'pages/Mypage';
import Report from 'pages/Report';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

function App() {
  const {isLoading} = useLoading();
  return (
    <Wrapper>
      <LoginProvider>
          <MainLayout>
            <Content>
              <Loading isLoading={isLoading} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/join' element={<Join />} />
                <Route path='/searchResult' element={<SearchResult />} />
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/report' element={<Report />} />
              </Routes>
            </Content>
          </MainLayout>
      </LoginProvider>
    </Wrapper>
  );
}

export default App;
