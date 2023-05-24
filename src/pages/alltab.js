import React, { useState } from 'react';
import { IconCross, IconCrossCircle, IconEdit } from '@salutejs/plasma-icons';
import Modal from 'react-modal';
import '../App.css'
import { IconPlus } from "@salutejs/plasma-icons";
import { Button, Card, CardBody, CardContent, CarouselCol, CarouselGridWrapper, CarouselLite, H2, TextField, useRemoteHandlers, CardHeadline1, DeviceThemeProvider, H1, } from '@salutejs/plasma-ui';
import { AddTablet } from './addtab';
import Axios from 'axios';
import { MedicationForm } from './medication_form';
import {get_data, save_data_user} from '../data/data.js'
import{Error_Alltab} from '../data/find_error'

//(!localStorage.getItem('alltabindexcarousel')) ? localStorage.setItem("alltabindexcarousel", 0) : index=parseInt(localStorage.getItem('alltabindexcarousel'))
function AllTab() {
    let data = get_data()
    
    const initialItems = data.tablets
    const [items, setItems] = useState(initialItems);


    const axis = 'x';

    const [index] = useRemoteHandlers({
        initialIndex: (!localStorage.getItem('alltabindexcarousel')) ? 0  : parseInt(localStorage.getItem('alltabindexcarousel')),
        axis,
        delay: 30,
        longDelay: 200,
        min: 0,
        max: Error_Alltab(items) - 1,//Error_Alltab(items)
    });


    
    const handleDelete = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        data.tablets.splice(index, 1);
        save_data_user(data)
        

    };
    localStorage.setItem("alltabindexcarousel", 0)
    return (
        <DeviceThemeProvider zIndex="99">
            <h2 align="center">Добавленные лекарства</h2>
            <CarouselGridWrapper style={{
                position: 'relative',

            }}>
                <CarouselLite
                    axis={axis}
                    index={index}
                    scrollMode="scroll"
                    scrollSnapType="mandatory"
                    detectActive detectThreshold={0.5}
                    style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', paddingStart: "0px", }} >

                    {items && items?.map(({ name, period, start_date,finish_date, times, doza, condition }, i) => (
                        <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign="center" style={{ position: 'relative', }}>
                            <Card style={{ height: '400px', width: '90vw', margin: '10px' }} focused={i === index}>
                                <CardBody className="scrollbar1" style={{ overflowY: 'scroll' }}>
                                    <CardContent className='med__content' style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '20px' }}>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                                            <MedicationForm index={i} data={items[i]} alldata={data}></MedicationForm>
                                            <div style={{ margin: '0 16px', cursor: 'pointer', marginRight: '0px' }} onClick={() => handleDelete(i)}>
                                                <Button size='s' pin="circle-circle" color="inherit" contentLeft={<IconCross size='s' />} className='med__icon'></Button>
                                            </div>
                                        </div>

                                        <CardHeadline1 className='med__title' style={{ fontSize: '18px' }} >{name} </CardHeadline1>
                                        <hr style={{ margin: '10px 0' }} />
                                        <H2 className='med__title' style={{ fontSize: '16px', paddingTop: '26px' }} >Период приёма: {period}</H2>
                                        <H2 className='med__title' style={{ fontSize: '16px', paddingTop: '46px' }}>Дата начала: {start_date}</H2>
                                        <H2 className='med__title' style={{ fontSize: '16px', paddingTop: '46px' }}>Дата конца приема: {finish_date}</H2>
                                        <H2 className='med__title' style={{ fontSize: '16px', paddingTop: '46px' }}>Время приёма: {times ? times.filter(t => t !== '').join(', ') : ''}</H2>
                                        <H2 className='med__title' style={{ fontSize: '16px', paddingTop: '46px' }} >Дозировка: {doza}</H2>
                                        <H2 className='med__title' style={{ fontSize: '16px', paddingTop: '46px' }}>Условия приёма: {condition}</H2>
                                    </CardContent>
                                </CardBody>
                            </Card>



                        </CarouselCol>
                    ))}

                </CarouselLite>
            </CarouselGridWrapper>
        </DeviceThemeProvider>
    );
};
export { AllTab };



