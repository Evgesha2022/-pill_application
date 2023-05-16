import logo from './logo.svg';
import './App.css';
import  {AddTab} from './pages/alltab';
import {General} from './pages/general';
import {Profile} from './pages/profile';
import {Eapteka} from './pages/eapteka';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout'
function App() {
  return(
    <>
    
    <Routes >
    <Route path='/' element={<Layout  />}>
      <Route index element={<General/>}/>
      <Route path='/tablets' element={<AddTab/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/eapteka' element={<Eapteka/>}/>
      <Route path='*' element={<General/>}/>
    </Route>
    </Routes>
    </>
  )
};
export default App;