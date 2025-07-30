import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

// Layouts import
import MainLayout from 'layouts/MainLayout';

// Pages import
import Home from 'pages/Home';
import Login from 'pages/Login';
import Join from 'pages/Join';
import styled from '@emotion/styled';
import SearchResult from 'pages/SearchResult';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Wrapper>
      <MainLayout>
        <Content>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/searchResult' element={<SearchResult />} />
          </Routes>
        </Content>
      </MainLayout>
    </Wrapper>
  );
}

export default App;
