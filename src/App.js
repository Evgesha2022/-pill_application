
import './App.css';
import  {AllTab} from './pages/alltab.js';
import  {AddTablet} from './pages/addtab.js';
import {General} from './pages/general.js';
import {Profile} from './pages/profile.js';
import {Eapteka} from './pages/eapteka.js';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout.jsx'

import {get_data_tablets} from "./data"
import {createSmartappDebugger,
  createAssistant} from "@salutejs/client";

  get_data_tablets(0)
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI5MzY2Yjk4Yy1iOWM2LTRkOWItYjYzNi02ZGI3Y2E4MDZiZTAiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ2NTUwMTksImF1ZCI6IlZQUyIsImlhdCI6MTY4NDU2ODYwOSwidHlwZSI6IkJlYXJlciIsInNpZCI6IjRmZmMzOGRlLTgxOWEtNDE2Ni1hZWMzLTVlN2I1NDc5YThlOSJ9.kbTY-hBWhK8lwBYjuh29QlrqlHHxFCXQxByFTg_ak78iBLwcdgQfI3ckl72vsQBmuvxRqgjB9VECUNr0Yp8LjkRy_uB5FP76rFObHMC69m6SMuGOQdYcqOcF9CDPE0dv7n-WjBaHaYw_uZUAtygk3L33EdaqNptBBOb_b3mHurX9poQihjlyTGLWj2yZ-8Qc-T5Ul3eU972nz5Hw-Ab3kM2ddyrVBjpwp1hW9rGNI8LNWPDW9_CERxblu97PWDEWAqziyUvcUxgHafeJ2xoPkyrGzTcABG1JYxpNFASpg7iH_ny8G5ZySPXeN1OMdfIRVtNQpJKX1syGgkX2TvurhRp1fpQdkrkOK2FEkgRinnfsxe-6mM-sC06ZI6NpxAgl9ZNKMAWNV3UEGiMjf1lZLYugCqw7zDQYJceLuW8CK1CcFsG0ulFAac3NfAJAU9QpRIK4X3RRWfG6uCBp6x5x_wv10y07clCWnjxcqlK8ArtQE-mz8r8_In_YUkiQ8O2hRqLEIAdN2LpHsZH0L1GX0tPyGN4vKY8CQrwddBQiFM6i9IGaJI1sAzANJKY50wqlmdY8zhNsbwvlQsrIKoY459HRK90s4Ry0tkZUNEGBBN_nascBcxMaNO58pJUm0llW0L8bK5iiBzouMBcVWyJnzJWBTO77vzic3tTMc4F2-8o'
  const initializeAssistant = (getState, getRecoveryState) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token:  token,
        initPhrase: `запусти ${process.env.REACT_APP_SMARTAPP}`,
        getState,
        getRecoveryState,
        nativePanel: {
          // Стартовый текст в поле ввода пользовательского запроса
          defaultText: 'Покажи что-нибудь',
          // Позволяет включить вид панели, максимально приближенный к панели на реальном устройстве
          screenshotMode: false,
          // Атрибут `tabindex` поля ввода пользовательского запроса
          tabIndex: -1,
      },
      });
    }
    return createAssistant({ getState, getRecoveryState });
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
          case 'add_tablet':
            
            return this.add_tablet(action);
          case 'add_user':
            return this.add_user(action);
          default:
            throw new Error();
        }
      }
    }
add_tablet (action) {
      console.log('add_tablet', action.name);
      if (action.name != undefined){
      this.setState({
          notes: [
            {
              name:    action.name,
            },
            ...this.state.notes.slice(1),
          ],
      })
    }
  }
  add_user (action) {
    console.log('add_user', action);
    if (action.note != undefined){
    this.setState({
        notes: [
          {
            name:    action.note,
          },
          ...this.state.notes.slice(1),
        ],
    })
  }
}


    render() {
      console.log('render');

  return(
    <>
    <Routes >
    <Route path='/' element={<Layout  />}>
      <Route index element={<General/>}/>
      <Route path='/tablets' element={<AllTab/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/eapteka' element={<Eapteka/>}/>
      <Route path='/addtablet' element={<AddTablet
      onAdd={ (note)=>{this.add_tablet({ type: "add_tablet", note }); } }
      onChangeAdd = {(this.state)}
      />}/>
    </Route>
    </Routes>
    </>
  )
};
  }


export default App;