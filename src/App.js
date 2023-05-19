
import './App.css';
import  {AllTab} from './pages/alltab.js';
import  {AddTablet} from './pages/addtab.js';
import {General} from './pages/general.js';
import {Profile} from './pages/profile.js';
import {Eapteka} from './pages/eapteka.js';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout.jsx'
import { InputActionType } from './scenario/types.ts';
import {get_data_tablets} from "./data"
import {createSmartappDebugger,
  createAssistant} from "@salutejs/client";

  get_data_tablets(0)
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI4OGY0MDdmYS04ZGQ2LTQ0NWUtODA3YS00ZThjMjA0NjlkOWMiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ1NzkyMjMsImF1ZCI6IlZQUyIsImlhdCI6MTY4NDQ5MjgxMywidHlwZSI6IkJlYXJlciIsInNpZCI6IjYwNDhlMTFhLTdmMzYtNDM1YS04MGQ0LTEyOTYxNTIxNzMxMyJ9.LbCDrlr7wEnOH9yg9APd1Q5-OjG-JrjqHBEau7wMGcm7Scq8UcMm4Vfd-p4_EfIM2R8DIza028kQqGe8xk3vb12Z_1IR4x1q0mr2qocDdpZJFfZh61HXggrZQuWPzOTQ1t0xXjotL8WaqPml45TPPoDlOnT3h7IOWXEtv5hTWvOYlXmjVXaL-whQ61tQ_VNLp5Ese4euZwJNwMKqFoM7i6WDpHLbAKqNKRmY0Nrv0gJCVqYhg9Pa8TMYD4cYzuJPDzRgmW8qERhYon5eqRbhtiq2deDFOYAwbhBC3BTma_Hl2Z9xNJU97X2bZ23n0NRpM6A-uvCE-tMRxOymEDkJA80168jL9N7xHVuXgbZhOqNDRP6Td_WeL1RDSSZG2iRZa9NOJ4LDuDIJ_z0ypBde193Bd4Hy1ZZhzpwyAI6mBxQqVh_vKPHcRxO3BHjRIgpXzMIQYMXPkw8iVUTtgaUCaFvah8plqFg4uYFJzU7B-pXs-qW2AHQIDtch9q2Vfzbrf5DDK9LdnGnkJiSgfcaiB2QWtD4lQiWyD7bkHfPnOm9zdP19ZaPyLysI_XLImo9nW3aUZPdLye1uGW1a_OMui-MWqkAAbYbKRiqv2Gz6iL9qTkKv8QGn4GyzACZq68pVmLuNJvm0Cjgt9ahM_4IDShYBF_AnTD6CFgOvWnHeNUo'
  const initializeAssistant = (getState, getRecoveryState) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token:  token,
        initPhrase: `Привет`,
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
      console.log('add_tablet', action);
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