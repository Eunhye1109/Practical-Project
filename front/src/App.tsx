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

function App() {
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
