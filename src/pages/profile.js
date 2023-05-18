import React from 'react';
import { } from '@salutejs/plasma-ui/components/ProductCard/ProductCardStepper.js';
import '../App.css'
// ./App.css
import { IconTrashFilled, IconBell, IconDisclosureRight, IconLogout, IconSettings } from '@salutejs/plasma-icons';
import { Button, Card,  CardBody, CardContent, CardHeadline1, TextField} from '@salutejs/plasma-ui';
import {  useState } from 'react';

import axios from '../axios.js';


function  Profile(){
  
  
  const handleSubmit = (e) => {//здесь записываем данные в базу данных
      e.preventDefault();
      console.log({
        name: name,
        surname:surname,
        birthday:birthday
              })
      axios.post('/profile', {
name: name,
surname:surname,
birthday:birthday
      });
  };
  let value=''
  const [items, setItems] = useState(value)
  
  const [name, setName] = useState(value);
  const [surname, setSurname] = useState(value);
  const [birthday, setBirthday] = useState(value);

  return (
    
    <div background-color="rgba(0, 0, 0, 0.5)"  z-index="1200">
        
        <Card  style={{ height: '50vw', width: '90vw', margin: '0px', backgroundColor: 'rgb(6, 22, 33)' }}>
            <CardBody>
                <CardContent className='med__content' style={{ marginLeft: '20px', marginTop: '26px' }} >
                    <CardHeadline1 className='med__title' style={{ fontSize: '40px', paddingBottom: '46px', paddingTop: '36px' }}>
                        {'Ваш профиль'}
                    </CardHeadline1>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'height 0.5s ease-out' }}>
                        <TextField style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }} name="title" onChange={(e) => {setName(e.target.value)}}  placeholder="Ваше имя"
                        required />
                        <TextField
                                      style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                      
                                      onChange={(e) => {setSurname(e.target.value)}}
                                      placeholder="Ваша фамилия"/>
                        
                        <TextField
                                      style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                      type='date'
                                      name={`date`}
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