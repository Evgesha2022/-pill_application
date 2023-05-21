
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
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIwNGI5MDA5ZC0xY2VkLTQzMGItODU4My00MjNkYTNhMDFmMmIiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ3NDk5NzgsImF1ZCI6IlZQUyIsImlhdCI6MTY4NDY2MzU2OCwidHlwZSI6IkJlYXJlciIsInNpZCI6IjU3NTdlNzAyLWViN2ItNDkyMS04N2RjLWY0MzNiMjM5YjExYSJ9.jD5Efui6AwAlAOff7k0_1vXUtX6mJboNJxEkVICx7wIx-3DtDOrgj6_PSktctngtvbgKZOqBYHtrzaNAPYrsO0jsdCxnWp5FnjwBHePNooD8Dpl-vt4k-zGYuhy5gD97hGBYYGcI73MZecA1s_8njbdqSEHVCREnV6siueiKcvyAV8k5QgrlK_8M_H_VatxvjtNVoM6fXrZzRHoYf2XmTDxOjMaAcxaZ0SlLC3BRQXqQPVKu6wbE-57CbEz0RNYwQRqwDXxI0PZlv4is6Q8ilHRx4kuxcxheVEslfLXDlSpzJn0vVYUIib24xwIoBgJsKosHpI3sjBnYuQCwrSGt-QhqWjUHty-CBWlHUB1TmVI0qbdlb1PiZaUXFkvsS0XR6GEVNK7ULTGMfsfrXQ_0rtRl90-YmXh9smGGU7Qorwc8xHdbwIQo6Im4fhWXEl5hutc6v3L6e5T9zfJZtdeyxdVhKUKtWWC8Kp7nCJrpaGWoB780LAflRMWJ8nhoqYpeY9U3kqC0NyLmOvF8XtjgBH1yCZkXRpnlBeXziYJOwP-jkA1dkkmGaEsOmdgtSmQHlA4uquAbV5qnquDQ5XByijKgSWhZtq2utnyAAUb5ju2PbD7-D3UvQMFw9rIYJCq9eOzkP-7qhupggPHBWSfYh7OhtKACMooHGBX7PSi18PY'
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