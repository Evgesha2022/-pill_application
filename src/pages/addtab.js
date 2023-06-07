
import '../App.css';
import React from 'react';
import Modal from 'react-modal';
import { Button, Card, CardBody, CardContent, CardHeadline1, DeviceThemeProvider, TextField } from '@salutejs/plasma-ui';
import { IconCrossCircle } from "@salutejs/plasma-icons";
import { useState } from 'react';
import axios from '../axios.js';
import { get_data, save_data_user , capitalizeAfterSpace} from '../data/data.js'
import { addDaysToDate, check_start } from '../data/add_days'
import{check_finish_date}from '../data/data.js'



export function AddTablet(props) {
    let data = get_data()
   // console.log("addtab", data)
    var today = (new Date()).toLocaleDateString();
    //const { onAdd } = this.props;
    //const { onChangeAd1 } = this.props;

    const { onAdd } = props;
    const { onChangeAdd } = props;
    //let i =onChangeAdd["notes"].lenght
let value = ''
const [items, setItems] = useState(value)

    const [name, setName] = useState(value);
    const [doza, setDoza] = useState(value);
    const [period, setPeriod] = useState(value);
    const [start, setStart] = useState(value);
    const [times, setTimes] = useState([]);
    const [condition, setCondition] = useState(value);
    //console.log(onChangeAdd)
    const handleSubmit = (e) => {//здесь записываем данные в базу данных
        e.preventDefault();
        //console.log(onAdd)
        console.log(start)
        
        if(name===''|| start==='' || doza==='' ){
            setName('')
        setStart('')
        setItems('')
        setCondition('')    
        setDoza('')
        setPeriod('')
        }
        
        else {
        var tablet = new Object();
        var new_start = check_start(start,  times[0]);
        var finish_date = addDaysToDate(new_start, period)
        console.log("finish_date", finish_date)
        
        
        if(times.length===0){times.push("00:00")}
        tablet = {
            id: Math.random().toString(36).substring(7),
            name:capitalizeAfterSpace( name),
            doza: doza,
            start_date: new_start,
            finish_date: finish_date,
            times: times,
            condition: condition,
            period: period
        }
       // add_tablet_base(id,  action.name, action.period,action.doza,start, finish_date, times, action.condition  )
       if(check_finish_date(finish_date)){data.tablets.push(tablet)
        console.log(data)
        localStorage.setItem("user", data);
        save_data_user(data)}
        setName('')
        setStart('')
        setItems('')
        setCondition('')    
        setDoza('')
        setPeriod('')}
    };
    
    

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
        <DeviceThemeProvider background-color="rgba(0, 0, 0, 0.5)" z-index="1200" className="scrollbar1" style={{ overflowY: 'scroll' }}>
            <Card style={{ height: '60vh', width: "95vw", margin: '10px' }} >
                <CardBody className="scrollbar1" style={{ overflowY: 'scroll' }} >
                    <CardContent style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginLeft: '0.25rem' }}>
                        <CardHeadline1 className='med__title' style={{ fontSize: '24px', marginBottom: '40px', paddingTop: '10px' }}>
                            {'Добавить лекарство'}
                        </CardHeadline1>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', transition: 'height 0.5s ease-out' }}>
                            <TextField style={{ fontSize: '20px', width: '70vw', paddingBottom: '20px' }} name="title" onChange={(e) => { setName(e.target.value) }} placeholder="Название лекарства"
                                required value={name} />
                            <TextField
                                style={{ fontSize: '20px', width: '70vw', paddingBottom: '20px' }}
                                type='date'
                                name={`date`}
                                value={start}
                                helperText={`Сегодня ${today}`}
                                onblur= {(e) => { check_finish_date(e.target.value) }}
                                onChange={(e) => { setStart(e.target.value) }}
                                placeholder="Дата начала приёма" />
                            <TextField
                                style={{ fontSize: '20px', width: '70vw', paddingBottom: '20px', marginLeft: '0.65rem' }}
                                type='number'
                                value={period}
                                helperText='Введите число'
                                onChange={(e) => { setPeriod(e.target.value) }}
                                placeholder="Количество дней" />
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

                            <Button view='primary' style={{ alignSelf: 'center', marginBottom: '26px', width: '200px' }} onClick={() => setItems({ ...items, time: [...times, ''] })}>Добавить время</Button>
                            < TextField style={{ paddingBottom: '20px', fontSize: '20px', width: '70vw' }} helperText='1 таблетка | 1 капсула | 1 ампула' name="doza" onChange={(e) => { setDoza(e.target.value) }} placeholder="Дозировка" required value={doza}/>
                            <TextField style={{ paddingBottom: '20px', fontSize: '20px', width: '70vw' }} name="condition" helperText='до еды | во время еды | после еды | после пробежки' onChange={(e) => { setCondition(e.target.value) }} placeholder="Условия приёма" value={condition}/>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px' }}>
                            <Button view='primary' style={{ width: '120px' }} type="submit" onClick={handleSubmit}>{'Добавить'}</Button>
                            
                        </div>
                    </CardContent>
                </CardBody>
            </Card>
        </DeviceThemeProvider>
    );
};



