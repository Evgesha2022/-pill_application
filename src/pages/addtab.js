
import '../App.css';
import React from 'react';
import Modal from 'react-modal';
import {Button,Card, CardBody, CardContent, CardHeadline1, TextField} from '@salutejs/plasma-ui';
import {IconPlus, IconCrossCircle} from "@salutejs/plasma-icons";
import {  useState } from 'react';

import axios from '../axios.js';
export function AddTablet (){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setTimes('');
      setModalIsOpen(false);
    };
    const handleSubmit = (e) => {//здесь записываем данные в базу данных
        e.preventDefault();
        axios.post('/', {
name: name,
surname:doza,
birthday:start
      });
        closeModal();
    };
    let value=''
    const [items, setItems] = useState(value)
    
    const [name, setName] = useState(value);
    const [doza, setDoza] = useState(value);
    const [period, setPeriod] = useState(value);
    const [start, setStart] = useState(value);
    const [times, setTimes] = useState([]);
    const [condition, setCondition] = useState(value);

    const handleChangeTime = (event, index) => {
      const { name, value } = event.target;
      const newTimes = [...times];
      newTimes[index] = value;
      setItems({ ...items, time: newTimes });
      setTimes(newTimes);
  };

  const handleDeleteTime = (index) => {
      const newTimes = [...times];
      newTimes.splice(index, 1);
      setItems({ ...items, time: newTimes });
      setTimes(newTimes);
  };

    return (
      
      <div background-color="rgba(0, 0, 0, 0.5)"  z-index="1200">
        <Button  onClick={openModal} className='butaddpill' pin="circle-circle" contentLeft={<IconPlus/>} />
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}  z-index="1200" >
          <form onSubmit={handleSubmit} z-index="1200" >
          <Card  style={{ height: '50vw', width: '90vw', margin: '0px', backgroundColor: 'rgb(6, 22, 33)' }}>
              <CardBody>
                  <CardContent className='med__content' style={{ marginLeft: '20px', marginTop: '26px' }} >
                      <CardHeadline1 className='med__title' style={{ fontSize: '40px', paddingBottom: '46px', paddingTop: '36px' }}>
                          {'Добавить лекарство'}
                      </CardHeadline1>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'height 0.5s ease-out' }}>
                          <TextField style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }} name="title" onChange={(e) => {setName(e.target.value)}}  placeholder="Название лекарства"
                          required />
                          <TextField
                                        style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                        type='date'
                                        name={`date`}
                                        onChange={(e) => {setStart(e.target.value)}}
                                        placeholder="Дата начала приёма"/>
                          <TextField
                                        style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                        
                                        onChange={(e) => {setPeriod(e.target.value)}}
                                        placeholder="Период приема"/>
                          {items && items.time && items.time.map((time, index) => (
                                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px', fontSize: '20px' }}>
                                   
                                    <TextField
                                        key={index}
                                        style={{ paddingBottom: '10px' }}
                                        type='time'
                                        name={`time`}
                                        id={index}
                                        value={times[index]}
                                        onChange={(event) => handleChangeTime(event, index)}
                                        placeholder="Время приёма"/>

                                    <div style={{display: 'flex', margin: '0 16px', cursor: 'pointer' }} onClick={() => handleDeleteTime(index)}>
                                        <IconCrossCircle size='s' className='med__icon' color="inherit"></IconCrossCircle>
                                    </div>
                                </div>
                            ))}

                            <Button view='primary' style={{ alignSelf: 'center', marginBottom: '26px', width: '200px' }} onClick={() => setItems({ ...items, time: [...times, ''] })}>Добавить время</Button>
                          < TextField style={{ paddingBottom: '20px', fontSize: '20px', width: '680px' }} name="doza" onChange={(e) => {setDoza(e.target.value)}}  placeholder="Дозировка" required />
                          <TextField style={{ paddingBottom: '20px', fontSize: '20px', width: '680px' }} name="condition"  onChange={(e) => {setCondition(e.target.value)}} placeholder="Условия приёма" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '36px' }}>
                          <Button view='primary' style={{ width: '120px' }} type="submit" onClick={handleSubmit}>{'Добавить'}</Button>
                          <Button style={{ width: '120px' }} onClick={closeModal}>Отмена</Button>
                      </div>
                  </CardContent>
              </CardBody>
          </Card>
           </form>
          
        </Modal> 
        </div>
    );
  };


 
