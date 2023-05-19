
import './App.css';
import  {AddTab} from './pages/alltab.js';
import {General} from './pages/general.js';
import {Profile} from './pages/profile.js';
import {Eapteka} from './pages/eapteka.js';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout.jsx'

import {createSmartappDebugger,
  createAssistant} from "@salutejs/client";
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIyODk1NTJjNC1hY2Y4LTQ4MWEtOTZjZi1hZTUyZWE4ODYxZmYiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ1NzU2MzgsImF1ZCI6IlZQUyIsImlhdCI6MTY4NDQ4OTIyOCwidHlwZSI6IkJlYXJlciIsInNpZCI6IjY1ZmY5N2I4LTI5ZGQtNDdlMi05MDZjLTVkOTA0YWM5YTExNyJ9.L7k3hLfJzmhaPxlghdCJFGdRQySavAUtAFoO5U6NGfVorjzwn_sFLBSX6cM-sj2hUfepf8KmQ7DiTrFmUFtfrQdVHfXPZUjafqOnaveNSAATde3eYyfXWvZZzoI2F0kbblOFhcNIOFn5mskYn03Z1euXzRuS-STpfuwUSquIP9AUQ30y-XPSLL-JCXw-hAGEebW2Ao2raivf7ghmSaRz92y_-Xpucg4ZCF1DQkZm9opcppva1A_22vf2yqZaueDjPEb32TYPkl95erNvzF_8YpnJ16HYoHGzRSibxE06kcN_clgGUFbKjZd1t9qoG-VvOu3MIa_Nx1gQvv7A0f_DkRWcSjB0GzzUpF6eNn0Fdy9W5dR5D1I3ulkXV1_Ldl6j7KXTMUMHoS7Xuh4UHPqM7Tp_4-Gz-FC-VKu7uL3D1eEWrmxApQCwSiKhj81EfkEJQesBnQv78Gt0thGCjiJ9jlO7IHWH_Hnyak38pjuSoNR0vbGgFCXQHRoHArvwKGU-N1rsDqDBlkLuZjT-ctqVXVoMSLTJvjhRTK6jFxMXuFtwfxjhij9XlMd9oAKFnU0XLuTNVsFs72YXgB-_fXKD5jH-wza95w4aRamOLc_LTNT5sYVe8egnSUw87-hALOgefQmiSIe0s2HqeEbvw2MZAPaQg0mp6k9IR2bNzBiLVWg'
  const initializeAssistant = (getState/*: any*/) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN ?? token,
        initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
        getState,
      });
    }
    return createAssistant({ getState });
  };


  export class App extends React.Component {

    constructor(props) {
      super(props);
      console.log('constructor');
  
      this.state = {
        notes: [],
      }
  
      this.assistant = initializeAssistant(() => this.getStateForAssistant());
      this.assistant.on("data", (event/*: any*/) => {
        console.log(`assistant.on(data)`, event);
        const { action } = event
        this.dispatchAssistantAction(action);
      });
      this.assistant.on("start", (event) => {
        console.log(`assistant.on(start)`, event);
      });
  
    }
  
    componentDidMount() {
      console.log('componentDidMount');
    }
  
    getStateForAssistant() {
      console.log('getStateForAssistant: this.state:', this.state)
      const state = {
        item_selector: {
          items: this.state.notes.map(
            ({ id, title }, index) => ({
              number: index + 1,
              id,
              title,
            })
          ),
        },
      };
      console.log('getStateForAssistant: state:', state)
      return state;
    }
  
    dispatchAssistantAction (action) {
      console.log('dispatchAssistantAction', action);
      if (action) {
        switch (action.type) {
          case '1':
            return this.evolve_choose(action);
  
          default:
            throw new Error();
        }
      }
    }
    render() {
      console.log('render');

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
  }


export default App;