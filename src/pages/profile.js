
import React, { useState } from 'react';
import { IconDisclosureRight, IconChevronDown, IconEdit } from '@salutejs/plasma-icons';

import { Button, Card, Cell, Container, DeviceThemeProvider, H2, HeaderSubtitle, HeaderTitle, Headline1, Radiobox, Switch, TextField, } from '@salutejs/plasma-ui';
import { post_data_profile } from '../data'
import axios from '../axios.js';
//import fs from "fs";
//const data = fs.readFile('data.json', 'utf8');

function error() {
   try {
        let la =localStorage.getItem('user')
        let data =  JSON.parse(la)
        return data
      } catch (SyntaxError) {
        alert("Профиль заполнен с ошибкой")
        let data = post_data_profile('', '', '')
  
        return data
      }
    
  }
  let data = error()
const Profile = () => {
    var abp =localStorage.getItem('abp');
    var ro = JSON.parse( localStorage.getItem("readonly"))
    const [activeButton, setActiveButton] = useState(localStorage.getItem('user')? 'save' : 'edit');
    


    const [isReadOnly, setIsReadOnly] = useState(localStorage.getItem('abp') ? ro : false);
    
    const handleEdit = (e) => {
        setActiveButton('edit');
        localStorage.setItem("abp", 'edit');
        setIsReadOnly(false);
    };
    let value = '';

    
    const [name, setName] = useState(localStorage.getItem('user') ? data.name : value);
    const [surname, setSurname] = useState(localStorage.getItem('user') ? data.surname : value);
    const [birthday, setBirthdate] = useState(localStorage.getItem('user') ? data.birthday : value);
 
    /*axios.get(`/profile/${id}`)
  .then(function (response) {
    const dataa = response.data;
    setName(dataa.name)
    setSurname(dataa.surname)
    setBirthday(dataa.birthday)
  }
  )
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });*/

    const handleSubmit = (e) => {
        setActiveButton('save');
        localStorage.setItem("abp", 'save');
        setIsReadOnly(true);
        e.preventDefault();
  
        data = post_data_profile(name, surname, birthday)
        
        localStorage.setItem("user", data);
        localStorage.setItem("readonly", true);
        data=error()
        /* axios.post('/profile', {
        name: name,
        surname:surname,
        birthday:birthday });*/
    };



    return (
        <DeviceThemeProvider className='profile' style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <div style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <h2 className='profile__title' style={{ marginLeft: '50px' }}>Ваш профиль</h2>
                <Button className='profile__btn__edit' onClick={handleEdit} disabled={activeButton === 'edit'} ><IconEdit /></Button>
            </div>
            <div className='profile__content' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                <div className='profile__edited' style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                    <HeaderSubtitle className='profile__text' >Имя</HeaderSubtitle>
                    <TextField style={{ width: '30vw', margin: '10px' }} onChange={(e) => { setName(e.target.value) }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите своё имя'} readOnly={isReadOnly} type='text' value={name}></TextField>

                    <HeaderSubtitle className='profile__text'>Фамилия</HeaderSubtitle>
                    <TextField onChange={(e) => { setSurname(e.target.value) }} style={{ width: '30vw', margin: '10px' }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите свою фамилию'} readOnly={isReadOnly} type='text' value={surname} ></TextField>

                    <HeaderSubtitle className='profile__text'>Дата рождения</HeaderSubtitle>
                    <TextField  onChange={(e) => { setBirthdate(e.target.value) }} style={{ width: '30vw', margin: '10px' }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите свою дату рождения'} readOnly={isReadOnly} type="date" id="birthday" name="birthday" value={birthday}></TextField>

                </div>

                <Button
                    className='profile__btn'
                    onClick={handleSubmit}
                    view="primary"
                    type='submit'
                    size='s'
                    style={{ marginTop: '10px' }}
                    disabled={activeButton === 'save'}>Сохранить</Button>
            </div>

        </DeviceThemeProvider >
    );
};
export { Profile };





