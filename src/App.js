
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

get_data_tablets(0)
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIxNjRiMTc5MS0xYmU3LTQ5OWEtYjk1My00YmQzMDcyYTc1NDIiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ5NTEyODksImF1ZCI6IlZQUyIsImlhdCI6MTY4NDg2NDg3OSwidHlwZSI6IkJlYXJlciIsInNpZCI6Ijk4ZjUxNDA5LTIyYmMtNGE5Yi04Y2VlLTBkNzZiMGM3YzI1ZSJ9.cZPPn-67eFFUYCDox51SuuJn87awk5fZroq6QgBoqR5Pw-Jdl9rcXtrNeAQPAOSuyLzGgMS-6L3KZMAtQeLR3VPu7DhcCtO08u78XbKcvL8JWuPEvOe0trx2GgptGwCNv1N3Nn7JTYaKJFTv2Vun3yqiUP4NomDH8RrRbnqv4fp-dnQA9-Nrqkc25qGzRlxVI_QJrm-BiwnM2tbN4ZvQhbCWrCdSu4fXXREKWxGh8jOKXoNp7vm0Im28lZCAulZP-2G0Am-72lNCSqZa1k_UnZbCvFyp8JtY0aIw3HG28xeWNk5tV1wUFkfn2Qnn6fjbclnuZdDOvOnCpNfgLQ8LyTbuoQKzRlMjyFq0gWg6Eow0jc2XJRnG7AU7BTV71RKNx-zHxP4rR1VfZ0MevXeuyBf04G3YA0Ws5IzQW0wOn-eufHA1G3bqhpslSdW1fo9Z_altrXH697SgDU_NE0FP9Cs-KHNNVBbV1zwoK1Dx4LAIlq7ShrG-YCRIvpStFtFmshePdAs7q8NCjSAn-4HQEfsZnvewjiOGYmP5IL1dG7Q8M5hS0OrWJgik4xna34dqW3IwrPpc3MeYEUrRcS9FPS9cXPr5mHNg_tZ35Z2KKnz4n-QV5jqWiDlp6QQc9594zOREqGBTpWQRSeRfLzRP9K8H__urwt-he4C4rWa0YcI'
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