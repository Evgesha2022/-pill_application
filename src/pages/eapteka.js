import React, { useState } from 'react';
import { IconCart, IconCrossCircle, IconEdit, IconSearch } from '@salutejs/plasma-icons';
import { Button, Card, CardBody, CardContent, CarouselCol, CarouselGridWrapper, CarouselLite, H2, TextField, useRemoteHandlers, CardHeadline1, Container, Row, Col, Cell, CellIcon, TextBox, Image, DeviceThemeProvider, ProductCard, TextBoxBigTitle, TextBoxSubTitle, CardParagraph1, CardMedia, Badge, TextBoxTitle, H1, HeaderContent, HeaderTitle } from '@salutejs/plasma-ui';
import { } from '@salutejs/plasma-ui/components/ProductCard/ProductCardStepper.js';
import '../App.css'
import axios from 'axios';
import { get_data, save_data_user } from '../data/data.js'
import { Error_Alltab } from '../data/find_error'
import { BiggerTitle, Title } from '@salutejs/plasma-ui/components/TextBox/TextBox';


function Eapteka() {
  let data = get_data()


  const initialitems = data.tablets


  const [items, setItems] = useState(initialitems);

  window.addEventListener('storage', function (event) {
    if (event.key === 'user') {
      // Выполните необходимые действия при изменении данных
      //console.log("event.newValue", event.newValue)
      data = JSON.parse(event.newValue);
      setItems(data.tablets)
    }
  });


  const axis = 'y';

  const [index] = useRemoteHandlers({
    initialIndex: 0,
    axis,
    delay: 30,
    longDelay: 200,
    min: 0,
    max: Error_Alltab(items),
  });



  return (

    <DeviceThemeProvider style={{ height: '100%' }} >
      <h2 align="center">Рекомендации из ЕАПТЕКИ</h2>
      <CarouselGridWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CarouselLite className='eapteka_carousel'
          axis={axis}
          index={index}
          scrollSnapType="mandatory"
          detectActive detectThreshold={0.5}
          style={{ paddingTop: '1.25rem', overflow: 'auto', paddingBottom: '1.25rem', paddingStart: "0px", }}>
          {items.map(({ name }, i) => (
            <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign="center">
              <Card className="product_card" style={{ height: '100px', marginTop: "20px", margin: '8px', width: '60vw' }} focused={i === index}>
                <Badge size='l' style={{ marginLeft: '0.5em', marginTop: '0.5em' }} text='Из списка лекарств' />
                <CardBody style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: '-10px' }}>


                  <TextBox style={{ marginRight: 'auto', marginBottom: '10px' }}>
                    <H1 style={{ fontSize: '20px', paddingLeft: '16px' }}>{name}</H1>
                  </TextBox>
                  <div style={{ marginRight: '16px' }}>


                    <Button view='primary'
                      text={window.innerWidth >= 768 ? 'Заказать' : ''}
                      contentRight={<IconCart className='cart_icon' style={{}} />}
                      size="s"
                      className='btn_wrapper'
                      onClick={() => window.open("https://www.eapteka.ru/search/?q=" + encodeURIComponent(name))}

                      style={{ height: '50px', width: '150px' }} tabIndex={-1} />
                  </div>

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




