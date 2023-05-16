const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const User = require('./src/dataSchema');
const app = express();
//const User= require('./models/ReactDataSchema')
const PORT = process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    err ? console.log(err) : console.log('Listening port')
})
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

const db = 'mongodb+srv://1kositzinaeugenia:zeka060304@cluster0.1pfaqhd.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res)=>console.log('Connect to DB'))
    .catch((error)=>console.log(error));
app.get('/', (req, res) => {
        const title = 'Home';
        res.render(createPath('index'), { title });
      });
app.get('users/:id', (req, res)=>{
    const title = 'User';
    const user ={
        id:0,
        name: "Bob",
    surname:"Smith",
    birthday: "1985.06.28",
    };
    res.render(createPath('post'), { title, user });
});

app.post('/add-user', (req, res)=>{
    const {name,surname,birthday  } = req.body;
    const user = new User({name,surname,birthday  });
    user    
        .save()
        .then((result) => res.send(result))
        .catch((error)=>{
            console.log(error);
            res.render(createPath('error'), {title :'Error'})
        })
});
//app.use(express.json());
//app.use(cors());

//mongoose.connect('mongodb+srv://1kositzinaeugenia:zeka060304@cluster0.1pfaqhd.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
