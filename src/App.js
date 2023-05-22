
import './App.css';
import  {AllTab} from './pages/alltab.js';
import  {AddTablet} from './pages/addtab.js';
import {General} from './pages/general.js';
import {Profile} from './pages/profile.js';
import {Eapteka} from './pages/eapteka.js';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout.jsx'

import {get_data_tablets} from "./data/data.js"
import {createSmartappDebugger,
  createAssistant} from "@salutejs/client";
import{create_base_user} from "./data/data.js"
if(!localStorage.getItem('user')) {create_base_user()} 
get_data_tablets(0)
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJhYWJiMmMyMC1mNTA0LTQ2NzAtYjA1MS1lYjFlNWE5Mzg0MDUiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ4NTg5NTUsImF1ZCI6IlZQUyIsImlhdCI6MTY4NDc3MjU0NSwidHlwZSI6IkJlYXJlciIsInNpZCI6Ijg0OWRhY2I4LTcyNDMtNDg4Yy1iNGIzLTE4NWQxM2RjYmYwOSJ9.sCYBUlBbOj-06PyBrbG2yTt1GgAiwMmkEZjvKZUHfQzTaB_vXNwkv3waKc5E6gTuT5pLoR02iWe95Ky9jmQg3Nvnp83INC23pPhl0XVAUJliK8ZGfUWTIoDbBkl4Vy_Yp09hg7915FpfAxI-UEqQBJ4fp-CwRnmfUm95MG5A5ELdgfxfV2sCj82tTVdB_LysbxyTkGOshlIx8XMyWe4xDmQMO-8XJWyN02wLIMb_CSS-ctwdkfWlchAk00N401Mg5b7ekK9JvRCQzcqvFzBnAxj_-bmPna_B-v5GdJA796VzrZTaX34LOUucXDel_fbJtFpUkkkegxHvsF-9WCXpCDG1RCbPFs7Ybs4R5HlQmyhdR5YgUV1j-KZffE-ji4qJL9Dat6IeSusesvHykIzmE4B2BoPDo3mpxgMmV7lhFQAsutwmZJfZ3RpNX8OSXlXdladdt6PIekW48s36LPNcQWP3iobP4KjuYDudZPxhUh3I_s-JnJsd8R2UZ4eQ5JQiBZJtrY9hMlnJLh14RxGzfBkOYILnNF4JVSomfcThem-NXu_AfKtl5IENgpxyAUbpcvp-dO_ICGiu67wLjBzLMYOqsENxCMAuDE8yg1a4q_a1ez0M1EHdAj5WEuBaGNAcZRetN0ZIfBfQ76SgXnav0Era3QxxlSE-6Fs16bCzHCw'
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