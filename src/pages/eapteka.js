import React, { useState } from 'react';
import { IconCart, IconCrossCircle, IconEdit, IconSearch } from '@salutejs/plasma-icons';
import { Button, Card, CardBody, CardContent, CarouselCol, CarouselGridWrapper, CarouselLite, H2, TextField, useRemoteHandlers, CardHeadline1, Container, Row, Col, Cell, CellIcon, TextBox, Image, DeviceThemeProvider, ProductCard, TextBoxBigTitle, TextBoxSubTitle, CardParagraph1, CardMedia, Badge, TextBoxTitle, H1 } from '@salutejs/plasma-ui';
import { } from '@salutejs/plasma-ui/components/ProductCard/ProductCardStepper.js';
import '../App.css'
import axios from 'axios';

function Eapteka() {

  const initialItems = [
    { id: 1, title: 'Афобазол', doza: '2 таблетки', period: '', start: '', time: ['12:00'], condition: 'во время еды', state: "0" },
    { id: 2, title: 'Цитрамон', doza: '1 таблетка', period: '', start: '', time: ['14:00'], condition: 'после еды', state: "0" },
  ];

  const [items, setItems] = useState(initialItems);


  const axis = 'x';

  const [index] = useRemoteHandlers({
    initialIndex: 0,
    axis,
    delay: 30,
    longDelay: 200,
    min: 0,
    max: items.length - 1,
  });



  return (

    < DeviceThemeProvider>
      <h2 align="center">Рекомендации из ЕАПТЕКИ</h2>
      <CarouselGridWrapper>
        <CarouselLite
          axis={axis}
          index={index}
          scrollSnapType="mandatory"
          detectActive detectThreshold={0.5}
          style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', paddingStart: "0px" }}>
          {items.map(({ title }, i) => (
            <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign="center">
              <Card style={{ height: '180px', width: '20vw', margin: '16px' }} focused={i === index}>
                <CardBody>

                  <CardContent style={{ textAlign: 'center' }}>

                    <Badge size='l' style={{ marginTop: '0.25em', marginBottom: '1.5em' }} text='Из списка лекарств' />

                    <TextBox style={{ alignItems: 'center' }}>
                      <H1 style={{ fontSize: '16px' }}>{title}</H1>
                    </TextBox>

                    <Button view='primary'
                      text="Заказать на ЕАПТЕКА"
                      contentRight={<IconCart />}
                      size="s"

                      onClick={() => window.open("https://www.eapteka.ru/search/?q=" + encodeURIComponent(title))}


                      stretch style={{ marginTop: '3em' }} tabIndex={-1} />

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

export { Eapteka };


