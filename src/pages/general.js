import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { CarouselLite, CarouselGridWrapper,useRemoteHandlers,BodyS, Switch,
  DeviceThemeProvider,CarouselCol,Card, CardBody, CardContent} from '@salutejs/plasma-ui';

import { forwardRef, useState, useEffect,useRef } from 'react';
import { useForkRef } from '@salutejs/plasma-ui';



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
  const items = Array(7)
      .fill({
          subtitle: 'Расписание приема таблеток',
      })
      .map(({ title, subtitle }, i) => ({
          title: `${days[getFutureDate(i).getDay()]} ${getFutureDate(i).toLocaleDateString()} `,
          subtitle: `${subtitle} `,
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
      <DeviceThemeProvider>
          <h3 align="center">Время {today.toLocaleString()}</h3>
          <CarouselGridWrapper>
              <CarouselLite
                  axis={axis}
                  index={index}
                  scrollMode="scroll"
                  scrollSnapType="mandatory"
                  detectActive detectThreshold={0.5}

                  style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem',paddingStart:"0px", }}
              >    
                  {items.map(({ title, subtitle }, i) => (
                      <CarouselCol key={`item:${i}`} size={2} sizeXL={4} scrollSnapAlign="start" type="calc">
                          <Card style={{ height: '350px', width: "90vw", margin: '10px' }} focused={i === index}>
                              <CardBody >
                                  <CardContent>
                                      {subtitle && <div style={{ fontSize: '12px', lineHeight: '20px' }}>{subtitle}</div>}
                                      <div style={{ fontSize: '16px' }}>{title}</div>
                                      <FullCard posts={posts[i]} />
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

function  FullCard(props)  {
    let i=0;
    let [isSubscribed, setIsSubscribed] = useState();
    let state =JSON.parse(localStorage.getItem("state"))  || false; 
    isSubscribed = state
    console.log(isSubscribed)
    state = (state == false) ? true : false;
  const handleChange = () => {
    state = (state == false) ? true : false;
    localStorage.setItem("state", JSON.stringify(state));
    setIsSubscribed(state);
  };
    const content = props.posts.map((post) =>
      <div key={post.id}>
        <h3 >{post.name}            {post.time}
        <Switch  defaultChecked={false} onClick={
                    handleChange
                } checked={isSubscribed}/>
        </h3>
        <p  >{post.doza}  {post.condition} </p>  
        
        <hr />
      </div>);
    
    return (
      <div>
        {content}
      </div>
    );
  }
  
  const posts = {
    0:[
    {id: 1, name: 'Афобазол', doza: '2 таблетки', time:"12:00", condition:"во время еды", state:"0" },
    {id: 2, name: 'Цитрамон', doza: '1 таблетка',time: "14:00", condition:"после еды"}],
    1:[
        {id: 1, name: 'Афобазол', doza: '2 таблетки', time:"12:00", condition:"во время еды", state:"0" },
        {id: 2, name: 'Цитрамон', doza: '1 таблетка',time: "14:00", condition:"после еды", state:"0"}],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[]
    };

    function getFutureDate(days){
        var now = new Date();
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + days)
      };
function MyForwardingRefComponent (val, st){
    // const sl ={0:"false", 1:"true"}
    let innerRef = useRef();
    console.log(val)
    // console.log(val);
    const demoId = document.querySelector(".Switch");
     let state =JSON.parse(localStorage.getItem("state"))
     if (state==null){state=false}
     demoId.st=true
     console.log(innerRef.checked)
    
    let send = () => {
        state= (innerRef.checked == false) ? true : false;
        
        innerRef.checked=state;
        console.log(innerRef.checked)
        localStorage.setItem("state", JSON.stringify(innerRef.checked));
      };;
};
export {General}