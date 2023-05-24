
import '../App.css';
import React from 'react';
import { AddTablet } from './addtab.js';
import {
  CarouselLite, CarouselGridWrapper, useRemoteHandlers, BodyS, Switch,
  DeviceThemeProvider, CarouselCol, Card, CardBody, CardContent
} from '@salutejs/plasma-ui';
import { useState } from 'react';
import {get_time, get_tablets_in_day} from "../data/data"



function General() {
  var today = new Date();
  const days = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    0: 'Воскресенье',
  };

  //const { onAdd } = this.props;
  //const { onChangeAd } = this.props;
  const items = Array(7)
    .fill({
      subtitle: 'Расписание приема таблеток',
    })
    .map(({ title, subtitle }, i) => ({
      title: `${days[getFutureDate(i).getDay()]} ${getFutureDate(i).toLocaleDateString()} `,
      subtitle: `${subtitle} `,
      i: i,
      tablets:get_tablets_in_day(getFutureDate(i))
    }));

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
    <DeviceThemeProvider zIndex="99" >
      <h2 align="center">Время {get_time()}</h2>
      <CarouselGridWrapper>
        <CarouselLite
          axis={axis}
          index={index}
          scrollMode="scroll"
          scrollSnapType="mandatory"
          detectActive detectThreshold={0.5}
          style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', paddingStart: "0px", }}
        >
          {items.map(({ title, subtitle, tablets }, i) => (
            <CarouselCol key={`item:${i}`} size={2} sizeXL={4} scrollSnapAlign="start" type="calc">
              <Card style={{ height: '420px', width: "90vw", margin: '10px' }} focused={i === index}>
                <CardBody className="scrollbar1" style={{ overflowY: 'scroll' }} >
                  <CardContent >
                    {subtitle && <div style={{ fontSize: '12px', lineHeight: '20px' }}>{subtitle}</div>}
                    <div style={{ fontSize: '16px' }}>{title}</div>
                    <FullCard posts={tablets} />
                  </CardContent>
                </CardBody>
              </Card>
            </CarouselCol>
          ))}
        </CarouselLite>
      </CarouselGridWrapper>

    </DeviceThemeProvider>
  );
}

function FullCard(props) {
  console.log('get_tablets_in_day',props.posts[0] )
  //console.log("date", daTe)
  let [isSubscribed, setIsSubscribed] = useState();
  let state = JSON.parse(localStorage.getItem("state")) || false;
  isSubscribed = state
  //console.log(isSubscribed)
  state = (state == false) ? true : false;
  const handleChange = () => {
    state = (state == false) ? true : false;
    //localStorage.setItem("state", JSON.stringify(state));
    //setIsSubscribed(state);
  };
  const content = props.posts.map((post, i) =>
    <div key={i} >
      <h3 >{post.name}            {post.times[0]}
        <Switch defaultChecked={false} onClick={
          handleChange()
        } checked={isSubscribed} />
      </h3>
      <p  >{post.doza}  {post.condition} </p>

      <hr />
    </div>);

  return (
    <div style={{}} >
      {content}
    </div>
  );
}





const posts = {
  0: [
    { name: 'Афобазол', doza: '2 таблетки', time: "12:00", condition: "во время еды", state: "0" },
    {name: 'Цитрамон', doza: '1 таблетка', time: "14:00", condition: "после еды" },
    {  name: 'Афобазол', doza: '2 таблетки', time: "12:00", condition: "во время еды", state: "0" },
    { name: 'Цитрамон', doza: '1 таблетка', time: "14:00", condition: "после еды" }],
  1: [
    { name: 'Афобазол', doza: '2 таблетки', time: "12:00", condition: "во время еды", state: "0" },
    {  name: 'Цитрамон', doza: '1 таблетка', time: "14:00", condition: "после еды", state: "0" }],
  2: [],
  3: [],
  4: [],
  5: [],
  6: []
};

function getFutureDate(days) {
  var now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + days)
};
export { General }