
import './App.css';
import  {AllTab} from './pages/alltab.js';
import  {AddTablet} from './pages/addtab.js';
import {General} from './pages/general.js';
import {Profile} from './pages/profile.js';
import {Eapteka} from './pages/eapteka.js';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import {Layout} from './components/Layout.jsx'
import{addDaysToDate_asist,addDaysToDate,  check_start} from './data/add_days'
import {get_data_tablets,  add_tablet_base, get_time, delete_all_pils, delete_tablet_one_time, get_data, check_finish_date} from "./data/data.js"
import {createSmartappDebugger,
  createAssistant} from "@salutejs/client";


//const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI3ODlhMjZkYy1iNGE4LTRlNmQtODYzYS0yMGYzNzRmMzFhOTciLCJzdWIiOiJmZjAwMWZiNjdhYmU5ZGFmMzY1ZTQwZTc0NDNhOWE0MzQ0YjRiYzE2ODRlOTFiZmZlNTVlMjFlMzgzMmYxNjY4YmQyZGMiLCJpc3MiOiJLRVlNQVNURVIiLCJleHAiOjE2ODUwMzgxMzAsImF1ZCI6IlZQUyIsImlhdCI6MTY4NDk1MTcyMCwidHlwZSI6IkJlYXJlciIsInNpZCI6IjY3Zjc1Y2I4LWQ2YzQtNGE1OC05MmM3LWE2NWVhNWZiODU4YyJ9.iOe-IuiVsCGtGSmvZU1dqSIINZc8rjadn4K_Xtp2OykhwNllDCMIb_XZX9hzhBB8UQIVT_n2g_YTHSDXHauj8sglo--dDIOGm6VW58AJfzJwUscMOhKIB3rrb86tWDVJzAzchjBWBXvRy0-32ZWCCzovQ754dG-HvXdEB-tLAWVskIQkUzZD39Vh6cN5F7UMd9LLnLcAI3f27rj_pF3wCXVqAiUfZuQaw7yzPMx7fIyphLpgJdAeMznG36nOHbMDoPunoh503UBS-gBrUZ72rGTJi-XT6SlzQ8us593jIOX_AgpegTQs3gdtav4DWpawabvYRCrLalzClE99PeFVfjeXImd5kplyN0hbJv7SXQ4arfbVBACCMe1_NxgtKe9PtT-m-EFDBHsPJEx9pPqB4X4euNXneiP3CGcOsCbY0YAjfS2U27jKxDamMNts18Ctdq07oeQC31cqG6hT7O3P_MG-D_TJs3HXwDhHHmmYNJvHuWB6h53HhRpjUkfvGgfczQCPoziexT-STUhvKv2G3zJVPBfxoTTssW0vEc1_EiMWZsFkKzHXLCUqessTJXsoV0HxYeIVzbvPqIZuSJ-dmdjgLz2r0AgKEiiN8wjwj0sGN9NiFnIWv6lNy8MXdpBLQYf64sN8kw6B4UTO9dA8OPuqbFFlbdGmFt1dzGmFBBs'
  const initializeAssistant = (getState, getRecoveryState) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token:  process.env.REACT_APP_TOKEN ?? "",
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
        tablets: get_data().tablets,
      }
      console.log("our state", this.state)
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
          items: this.state.tablets.map(
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
          case 'delete_all_pils':
            return this.delete_all_pils(action);
          case 'delete_tablet_one_time':
            return this.delete_tablet_one_time(action);
          default:
            throw new Error();
        }
      }
    }
add_tablet (action) {
      //console.log('add_tablet', action.name);
      //console.log('start', action.name);
      console.log('add_tablet', action)
       var times =[get_time(action.times.value)]

      var start =check_start(action.date_start.value,  times[0]);
     
      console.log("start",start)
      var finish_date = addDaysToDate(start, action.period)
      console.log("from sber data", action.date_start.value)
      
      console.log("finish_date", finish_date)
      let id = Math.random().toString(36).substring(7)
     if(check_finish_date(finish_date)) {if (action.name != undefined)
      {
      this.setState({
          tablets: [
            {
            id: id, 
            name:    action.name,
            start_date: start,
            finish_date:finish_date
            },
            ...this.state.tablets.slice(1),
          ],
      })
      /*action.times.forEach(function(element){
        var time =new Date(element.value)
        get_time(time)
        times.push(get_time(time))

      })*/
    add_tablet_base(id,  action.name, action.period,action.doza,start, finish_date, times, action.condition  )
    }}
    else{
      console.log("не могу добавить")
    }
      
    
  }
  add_user (action) {
    //console.log('add_user', action.name);
    if (action.tablets != undefined){
    this.setState({
        tablets: [
          {
            name:    action.name,
            surname: action.surname
          },
          ...this.state.tablets.slice(1),
        ],
    })
    console.log(this.state.tablets)
  }
  console.log("tablets", this.state.tablets)
}
delete_all_pils(action){
  console.log('delete_all_pils', action)
      if (action.name != undefined){
      /*this.setState({ проработать уделение и здесь
          tablets: [
            {
            name:    action.name,
            start_date: start,
            finish_date:finish_date
            },
            ...this.state.tablets.slice(1),
          ],
      })*/
      //var condition =""
      //var times =[get_time(action.times.value)]
      /*action.times.forEach(function(element){
        var time =new Date(element.value)
        get_time(time)
        times.push(get_time(time))

      })*/
      delete_all_pils( action.name)
    }
}

delete_tablet_one_time(action){
  console.log('delete_tablet_one_time', action)
      if (action.name != undefined){
      /*this.setState({ проработать уделение и здесь
          tablets: [
            {
            name:    action.name,
            start_date: start,
            finish_date:finish_date
            },
            ...this.state.tablets.slice(1),
          ],
      })*/
      //var condition =""
      //var times =[get_time(action.times.value)]
      /*action.times.forEach(function(element){
        var time =new Date(element.value)
        get_time(time)
        times.push(get_time(time))

      })*/
      delete_tablet_one_time( action.name, action.time.value)
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