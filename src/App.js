import logo from './logo.svg';
import './App.css';
import  {AddTab} from './pages/addtab';
import {General} from './pages/general';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout'
function App() {
  return(
    <>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<General/>}/>
      <Route path='/tablets' element={<AddTab/>}/>
      <Route path='*' element={<General/>}/>
    </Route>
    </Routes>
    </>
  )
};
export default App;
