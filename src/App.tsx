import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
import ResultPage from './pages/result-page';




function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/result' element={<ResultPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
