import React from 'react';
import { } from '@salutejs/plasma-ui/components/ProductCard/ProductCardStepper.js';
import '../App.css'
// ./App.css
import { IconTrashFilled, IconBell, IconDisclosureRight, IconLogout, IconSettings } from '@salutejs/plasma-icons';
import { Button, Card,  CardBody, CardContent, CardHeadline1, TextField} from '@salutejs/plasma-ui';
import {  useState } from 'react';

import axios from '../axios.js';
//import fs from "fs";
//const data = fs.readFile('data.json', 'utf8');
function  Profile(){
  let id = "6465e2da3aced2480cef29af"
  let value=''
  const [name, setName] = useState("Ваше имя");
  const [surname, setSurname] = useState("Ваша фамилия");
  const [birthday, setBirthday] = useState("");
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
  
  const handleSubmit = (e) => {//здесь записываем данные в базу данных
      e.preventDefault();
      console.log({
        name: name,
        surname:surname,
        birthday:birthday
              })
     /* axios.post('/profile', {
name: name,
surname:surname,
birthday:birthday
      });*/

  };



  return (
    
    <div background-color="rgba(0, 0, 0, 0.5)"  z-index="1200">
        
        <Card  style={{ height: '50vw', width: '90vw', margin: '0px', backgroundColor: 'rgb(6, 22, 33)' }}>
            <CardBody>
                <CardContent className='med__content' style={{ marginLeft: '20px', marginTop: '26px' }} >
                    <CardHeadline1 className='med__title' style={{ fontSize: '40px', paddingBottom: '46px', paddingTop: '36px' }}>
                        {'Ваш профиль'}
                    </CardHeadline1>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'height 0.5s ease-out' }}>
                        <TextField style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }} name="title" onChange={(e) => {setName(e.target.value)}}  placeholder={name}
                        required />
                        <TextField
                                      style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                      
                                      onChange={(e) => {setSurname(e.target.value)}}
                                      placeholder={surname}/>
                        
                        <TextField
                                      style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                      type='date'
                                      name={birthday}
                                      onChange={(e) => {setBirthday(e.target.value)}}
                                      placeholder="Дата рождения"/>
                        
                        
                
                        
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '36px' }}>
                        <Button view='primary' style={{ width: '120px' }} type="submit" onClick={handleSubmit}>{'Добавить'}</Button>
                    </div>
                </CardContent>
            </CardBody>
        </Card>
      </div>
  );
};

export {Profile};