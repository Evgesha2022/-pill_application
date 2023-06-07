
import '../App.css';
import React from 'react';
import { AddTablet } from './addtab.js';
import {
  CarouselLite, CarouselGridWrapper, useRemoteHandlers, BodyS, Switch,
  DeviceThemeProvider, CarouselCol, Card, CardBody, CardContent
} from '@salutejs/plasma-ui';
import { useState } from 'react';
import { get_time, get_tablets_in_day, get_data_states, find_state, save_data_states, delete_state, array_states } from "../data/data"



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
      tablets: get_tablets_in_day(getFutureDate(i)),
      data: getFutureDate(i)
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
  var time = get_time(today)
  return (
    <DeviceThemeProvider zIndex="99" >
      <h2 align="center">Время {time}</h2>
      <CarouselGridWrapper>
        <CarouselLite
          axis={axis}
          index={index}
          scrollMode="scroll"
          scrollSnapType="mandatory"
          scroll-padding="1px"
          detectActive detectThreshold={0.5}
          style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', paddingStart: "0px", }}
        >
          {items.map(({ title, subtitle, tablets, data }, i) => (
            <CarouselCol key={`item:${i}`} size={2} sizeXL={4} scrollSnapAlign="start" type="calc">
              <Card style={{ height: '45vh', width: "90vw", margin: '10px', paddingRight: '0px' }} focused={i === index}>
                <CardBody className="scrollbar1" style={{ overflowY: 'scroll' }} >
                  <CardContent >
                    {subtitle && <div style={{ fontSize: '12px', lineHeight: '20px' }}>{subtitle}</div>}
                    <div style={{ fontSize: '16px' }}>{title}</div>
                    <FullCard style={{ width: "90vw" }} posts={tablets} data={data} />
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
  var today = new Date();
  var states_pills = []
  
  console.log(props.posts)
  if (props.data.toLocaleDateString() === today.toLocaleDateString()) { states_pills = array_states(props.posts); 
 
  
  }
  else { states_pills = new Array(props.posts.length).fill(false) }
  let [isSubscribed, setIsSubscribed] = useState(states_pills);
  
  //<Switch defaultChecked={false} onChange={()=>{setIsSubscribed(states_pills)}} />
  if (props.data.toLocaleDateString() !== today.toLocaleDateString()) {
    const content = props.posts.map((post, i) => {
      var condition = post.condition
      var modifiedcondition = condition.charAt(0).toLowerCase() + condition.slice(1);
      var time =post.times[0]
      if(post.times[0]==="00:00"){
       time =''
      }
      return (<div key={i} >
        <h3 >{post.name}            {time}

        </h3>
        <p  >{post.doza}  {modifiedcondition} </p>

        <hr />
      </div>)
    });
    return (
      <div style={{}} >
        {content}
      </div>
    );
  }

  var state_all = get_data_states()
  console.log("state_all_old" , state_all)
  
  const handleChange = (i) => {
    var obj = new Object();
    console.log("NewClick")
    obj = { id: props.posts[i].id, data: props.data, times: [props.posts[i].times[0]] };
    let state_ones = find_state(obj, state_all, props.data);
    if (isSubscribed[i] === true) {
      delete_state(state_ones, state_all);
      states_pills[i] = false
    }
    else {
      state_all.push(obj);
      console.log("push")
      states_pills[i] = true
    }
    setIsSubscribed(states_pills)
    save_data_states(state_all)
    state_all = get_data_states()
  };

  const content = props.posts.map((post, i) => {
    window.addEventListener('storage', function(event) {
      if (event.key === 'states') {
        // Выполните необходимые действия при изменении данных
        console.log("event.newValue", event.newValue)
        state_all= JSON.parse(event.newValue);
        console.log("state_all", state_all)
        console.log("props.posts", props.posts)
        //var post=get_tablets_in_day(today-1)
        //console.log("post", post)
        states_pills = array_states(props.posts);
        setIsSubscribed(states_pills)
        console.log("states_pills", states_pills)
      }
    });


    console.log("isSubscribed[i]",isSubscribed[i])
    const handleChangeWrapper = () => {
      handleChange(i);
    };
    var condition = post.condition
    var modifiedcondition = condition.charAt(0).toLowerCase() + condition.slice(1);
    return (<div key={i} >
      <h3 >{post.name}            {post.times[0]}
        <Switch defaultChecked={isSubscribed[i]} onChange={handleChangeWrapper} />
      </h3>
      <p style={{ width: '90vw' }} >{post.doza}  {modifiedcondition} </p>

      <hr />
    </div>)
  });

  return (
    <div style={{}} >
      {content}
    </div>
  );
}




function getFutureDate(days) {
  var now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + days)
};
export { General }