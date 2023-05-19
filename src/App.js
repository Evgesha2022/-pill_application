
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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJmNzBiOWUzYS00MTUwLTQzZTQtOTkxYS0zOTY5MzkzNTc4NzQiLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODQ0ODk5MTUsImF1ZCI6IlZQUyIsImlhdCI6MTY4NDQwMzUwNSwidHlwZSI6IkJlYXJlciIsInNpZCI6ImY3ZTZhNjg0LTgxNTMtNDZiNS1hOWM0LWJiNGQ4MmJlM2YzMSJ9.bvlFCNPBGzlDIAc0UfZDDyZplosyeV88XtEg7-F99tZrnMJwjz1gicRgNCyBt3Ckc-8XyAPW8mavwMD0vg7btXjxVCL4jzSFRNjOscolZZ9nZvPwCFOiqJImlNhW4GITsTCI_gazUC7oWsWSiwDXWyvS8agJJ2KTMYtA-r5Kwi5FjjdhZap_pi3_5P7cmuNBhCAAZ2Mpt07LR4_f7VH9oIx3t8gVi6uUYmF1E8DWPF3igDXGcbTNQtYMP-LbZc9hvW0tWZLg5EYD_UfEhU3BJH_D6XnyrhGIT6xWKVMRwEwX5wX1-Hb2Q9Qs0g7J-iKM7UPEY6oN4F8gCFNkQTNKBtkuZ2eVlY9bDf6e7rCehqDCF_Ch1HKTJbtJF4w1CdusllP2GZDmGhk-ZRFYG8cSvQw84eD9kUksQ2eCoSEWHKZTGht5ljsn1M8Gda7QquP5t9QQ2BVlJyKGqTsQqsqpx5ttASQh-FYsqAfKZ26NuGQN_xBmrQg2Oi2GBx5tgHV-NDz3QRUNXDZtzTWs5ETnBAC0_g4xqPkyBTMr-94m4cLHneoUKXQ6SBwka-xylWMwWw4hXDlHku-bEZ89EegFlp-GTWDXXzRjsu0r9MlUdfJyN6f-y49lKLFwvztWvnIMh9ZqYP0iW4mCeHVkjP0HvktaDRgejGpjeJoxguf1gS4"

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