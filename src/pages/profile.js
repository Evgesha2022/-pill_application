
import React, { useState } from 'react';
import { IconEdit } from '@salutejs/plasma-icons';

import { Button, DeviceThemeProvider, HeaderSubtitle, TextField } from '@salutejs/plasma-ui';
import { post_data_profile, capitalizeAfterSpace } from '../data/data'
//import axios from '../axios.js';
//import fs from "fs";
//const data = fs.readFile('data.json', 'utf8');

function error() {
  try {
    let la = localStorage.getItem('user')
    let data = JSON.parse(la)
    return data
  }
  catch (SyntaxError) {
    alert("Профиль заполнен с ошибкой")
    let data = post_data_profile('', '', '')

    return data
  }
}
let data = error()

const Profile = () => {
  const [activeButton, setActiveButton] = useState(JSON.parse(localStorage.getItem('user')).name = "" ? 'edit' : 'save');
  //if(abp=="save"){toggleReadOnly()}

  
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleEdit = (e) => {
    setActiveButton('edit');
    localStorage.setItem("abp", 'edit');
    setIsReadOnly(false);
  };
  let value = '';


  const [name, setName] = useState(localStorage.getItem('user') ? data.name : value);
  const [surname, setSurname] = useState(localStorage.getItem('user') ? data.surname : value);
  const [birthday, setBirthdate] = useState(localStorage.getItem('user') ? data.birthday : value);
window.addEventListener('storage', function(event) {
    if (event.key === 'user') {
      // Обработка изменений в хранилище
      data = JSON.parse(event.newValue);
      setName(data.name)
      setSurname(data.surname)
      setBirthdate(data.birthday)
      //console.log("addEventListener", data)
    }
  });

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

    post_data_profile(capitalizeAfterSpace(name), capitalizeAfterSpace(surname), birthday)

    data = error()
    window.addEventListener('storage', function(event) {
      if (event.key === 'user') {
        // Обработка изменений в хранилище

        data = JSON.parse(event.newValue);
        console.log("addEventListener", data)
      }
    });
    /* axios.post('/profile', {
    name: name,
    surname:surname,
    birthday:birthday });*/
  };
  function toggleReadOnly() {
    var input = document.getElementById("name");

    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
    } else {
      input.setAttribute("readonly", "readonly");
    }
  }


  return (
    <DeviceThemeProvider className='profile' style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <div style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className='profile__title' style={{ marginLeft: '50px' }}>Ваш профиль</h2>
        <Button className='profile__btn__edit' style={{ backgroundColor: 'transparent' }} pin="circle-circle" onClick={handleEdit} disabled={activeButton === 'edit'} ><IconEdit /></Button>
      </div>
      <div className='profile__content' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

        <div className='profile__edited' style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

          <HeaderSubtitle className='profile__text' >Имя</HeaderSubtitle>
          <TextField id="name" style={{ width: window.innerWidth >= 768 ? '30vw' : '64vw', margin: '10px' }} onChange={(e) => { setName(e.target.value) }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите своё имя'} readOnly={isReadOnly} type='text' value={name}></TextField>

          <HeaderSubtitle className='profile__text'>Фамилия</HeaderSubtitle>
          <TextField onChange={(e) => { setSurname(e.target.value) }} style={{ width: window.innerWidth >= 768 ? '30vw' : '64vw', margin: '10px' }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите свою фамилию'} readOnly={isReadOnly} type='text' value={surname} ></TextField>

          <HeaderSubtitle className='profile__text'>Дата рождения</HeaderSubtitle>
          <TextField onChange={(e) => { setBirthdate(e.target.value) }} style={{ width: window.innerWidth >= 768 ? '30vw' : '64vw', margin: '10px' }} className='profile__input' placeholder={isReadOnly ? '' : 'Введите свою дату рождения'} readOnly={isReadOnly} type="date" id="birthday" name="birthday" value={birthday}></TextField>

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





