
import React, { useState } from 'react';
import { IconDisclosureRight, IconChevronDown, IconEdit } from '@salutejs/plasma-icons';
import './profile.css'
import { Button, Card, Cell, Container, DeviceThemeProvider, H2, HeaderSubtitle, HeaderTitle, Headline1, Radiobox, Switch, TextField, } from '@salutejs/plasma-ui';
import { post_data_profile } from '../data'
import axios from '../axios.js';
//import fs from "fs";
//const data = fs.readFile('data.json', 'utf8');


const Profile = () => {

    let id = "6465e2da3aced2480cef29af"
    const [activeButton, setActiveButton] = useState('edit');

    const [isReadOnly, setIsReadOnly] = useState(false);

    const handleEdit = (e) => {
        setActiveButton('edit');
        setIsReadOnly(false);
    };

    let value = '';

    const [name, setName] = useState(value);
    const [surname, setSurname] = useState(value);
    const [birthday, setBirthdate] = useState(value);
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
        setIsReadOnly(true);
        e.preventDefault();
        console.log({
            name: name,
            surname: surname,
            birthday: birthday
        })
        let data = post_data_profile(name, surname)
        console.log(data)
        /* axios.post('/profile', {
    name: name,
    surname:surname,
    birthday:birthday
         });*/
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
                    <TextField style={{ width: '30vw', margin: '10px' }} onChange={(e) => { setName(e.target.value) }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите своё имя'} readOnly={isReadOnly} type='text'></TextField>

                    <HeaderSubtitle className='profile__text'>Фамилия</HeaderSubtitle>
                    <TextField onChange={(e) => { setSurname(e.target.value) }} style={{ width: '30vw', margin: '10px' }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите свою фамилию'} readOnly={isReadOnly} type='text'></TextField>

                    <HeaderSubtitle className='profile__text'>Дата рождения</HeaderSubtitle>
                    <TextField onChange={(e) => { setBirthdate(e.target.value) }} style={{ width: '30vw', margin: '10px' }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите свою дату рождения'} readOnly={isReadOnly} type="date" id="birthday" name="birthday" ></TextField>

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





