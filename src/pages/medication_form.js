import React, { useState } from 'react';
import { IconCrossCircle, IconEdit } from '@salutejs/plasma-icons';
import Modal from 'react-modal';
import '../App.css'
import { IconPlus } from "@salutejs/plasma-icons";
import { Button, Card, CardBody, CardContent, CarouselCol, CarouselGridWrapper, CarouselLite, H2, TextField, useRemoteHandlers, CardHeadline1, DeviceThemeProvider, H1, } from '@salutejs/plasma-ui';
import { AddTablet } from './addtab';
import Axios from 'axios';
import {get_data, save_data_user} from '../data/data.js'
import {addDaysToDate} from '../data/add_days'
function MedicationForm({ initialItems, onSubmit, onCancel, data, index, alldata }) {//data уже приходит сразу изменяемая таблетка

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [times, setTimes] = useState(data.times);
    //data.times массив с временами приема
    const newTimes1 = [...data.times];
    const [items, setItems] = useState(newTimes1)
    const openModal = () => {
        setModalIsOpen(true);
        setItems({ ...items, time: newTimes1 });
    };
    
    const closeModal = () => {
        setTimes('');
        setModalIsOpen(false);
    };
    const handleSubmit = (e) => {   //здесь записываем данные в базу данных
        e.preventDefault();
        var finish_date = addDaysToDate(start, period)
        data.name = name
        data.doza=doza
        data.period=period
        data.start_date=start
        data.times=times
        data.condition=condition
        data.finish_date= finish_date
        alldata.tablets[index]=data
        save_data_user(alldata)
        console.log(alldata)
        localStorage.setItem("alltabindexcarousel", index)
        //changedata.name = name
        closeModal();
        document.location.reload();//чтобы получить новые данные из локального хранилища
    };
    let value = ''
    

    const [name, setName] = useState(data.name);
    const [doza, setDoza] = useState(data.doza);
    const [period, setPeriod] = useState(data.period);
    const [start, setStart] = useState(data.start_date);
    
    //setItems({ ...items, time: newTimes1 });
    const [condition, setCondition] = useState(data.condition);

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

        <div background-color="rgba(0, 0, 0, 0.5)" z-index="1200">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ margin: '0 16px', cursor: 'pointer' }} onClick={openModal}>
                    <Button size='s' pin="circle-circle" color="inherit" contentLeft={<IconEdit />} className='med__icon'></Button>

                </div></div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal} z-index="1200" >
                <form onSubmit={handleSubmit} z-index="1200" >
                    <Card style={{ height: '100vw', width: '90vw', margin: '0px', backgroundColor: 'rgb(6, 22, 33)' }}>
                        <CardBody>
                            <CardContent className='med__content' style={{ marginLeft: '20px', marginTop: '26px' }} >
                                <CardHeadline1 className='med__title' style={{ fontSize: '40px', paddingBottom: '46px', paddingTop: '36px', alignSelf: 'center', }}>
                                    {'Редактирование лекарства'}
                                </CardHeadline1>
                                <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'height 0.5s ease-out' }}>
                                    <TextField style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }} name="title" onChange={(e) => { setName(e.target.value) }} placeholder="Название лекарства"
                                        required value={name}/>
                                    <TextField
                                        style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                        type='date'
                                        name={`date`}
                                        onChange={(e) => { setStart(e.target.value) }}
                                        placeholder="Дата начала приёма" value={start}/>
                                    <TextField
                                        style={{ fontSize: '20px', width: '680px', paddingBottom: '20px' }}
                                        type='number'
                                        helperText='Введите число'
                                        onChange={(e) => { setPeriod(e.target.value) }}
                                        placeholder="Период приема" value={period}/>
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
                                                placeholder="Время приёма" />

                                            <div style={{ display: 'flex', margin: '0 16px', cursor: 'pointer' }} onClick={() => handleDeleteTime(index)}>
                                                <IconCrossCircle size='s' className='med__icon' color="inherit"></IconCrossCircle>
                                            </div>
                                        </div>
                                    ))}

                                    <Button view='primary' style={{ marginBottom: '26px', width: '200px' }} onClick={() => setItems({ ...items, time: [...times, ''] })}>Добавить время</Button>
                                    < TextField style={{ paddingBottom: '20px', fontSize: '20px', width: '680px' }} name="doza" onChange={(e) => { setDoza(e.target.value) }} placeholder="Дозировка" required value={doza}/>
                                    <TextField style={{ paddingBottom: '20px', fontSize: '20px', width: '680px' }} name="condition" onChange={(e) => { setCondition(e.target.value) }} placeholder="Условия приёма" value={condition}/>
                                </div>
                                <div style={{ display: 'flex', width: '90vw', justifyContent: 'space-evenly', marginTop: '36px' }}>
                                    <Button view='primary' style={{ width: '120px' }} type="submit" onClick={handleSubmit}>{'Сохранить'}</Button>
                                    <Button style={{ width: '120px' }} onClick={closeModal}>Отмена</Button>
                                </div>
                            </CardContent>
                        </CardBody>
                    </Card>
                </form>
            </Modal>
        </div>
    );
} export { MedicationForm }