import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './Routes/Routes';
import Header from './Components/Header';
import './App.scss';


function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      {
        routes.map((data, index) => (
          <Route path={data.path} element={data.component} key={index} />
        ))
      }
    </Routes>
    </>
  );
}

export default App;
