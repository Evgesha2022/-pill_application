import React, { useState } from 'react';
import { IconCart, IconCrossCircle, IconEdit, IconSearch } from '@salutejs/plasma-icons';
import { Button, Card, CardBody, CardContent, CarouselCol, CarouselGridWrapper, CarouselLite, H2, TextField, useRemoteHandlers, CardHeadline1, Container, Row, Col, Cell, CellIcon, TextBox, Image, DeviceThemeProvider, ProductCard, TextBoxBigTitle, TextBoxSubTitle, CardParagraph1, CardMedia, Badge, TextBoxTitle, H1, HeaderContent, HeaderTitle } from '@salutejs/plasma-ui';
import { } from '@salutejs/plasma-ui/components/ProductCard/ProductCardStepper.js';
import '../App.css'
import axios from 'axios';
import { get_data, save_data_user } from '../data/data.js'
import { Error_Alltab } from '../data/find_error'


function Eapteka() {
  let data = get_data()

  const initialItems = data.tablets


  const [items, setItems] = useState(initialItems);


  const axis = 'x';

  const [index] = useRemoteHandlers({
    initialIndex: 0,
    axis,
    delay: 30,
    longDelay: 200,
    min: 0,
    max: Error_Alltab(items),
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
          {items.map(({ name }, i) => (
            <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign="center">
              <Card class="product_card" style={{ height: "180px", width: window.innerWidth >= 768 ? "50vw" : "70vw", margin: "16px" }} focused={i === index}>
                <CardBody>

                  <CardContent style={{ textAlign: 'center' }}>

                    <Badge size='l' style={{ marginTop: '0.25em', marginBottom: '1.5em' }} text='Из списка лекарств' />

                    <TextBox style={{ alignItems: 'center' }}>
                      <H1 style={{ fontSize: '20px' }}>{name}</H1>
                    </TextBox>

                    <Button view='primary'
                      text="Заказать на ЕАПТЕКА"
                      contentRight={<IconCart />}
                      size="s"

                      onClick={() => window.open("https://www.eapteka.ru/search/?q=" + encodeURIComponent(name))}


                      style={{ marginTop: '3em' }} tabIndex={-1} />

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


