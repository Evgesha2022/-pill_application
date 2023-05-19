import {registerValidation} from './validations/register.js'
import {body}  from 'express-validator';
import {validationResult}  from 'express-validator';
import jwt  from 'jsonwebtoken';
import express  from 'express';
import mongoose  from 'mongoose';
import userModel from './models/user.js';
import checkAuth from "./utils/checkAuth.js";
import cors from 'cors'
import * as UserContr from "./utils/userController.js"
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors())
const db = 'mongodb+srv://1kositzinaeugenia:zeka060304@cluster0.1pfaqhd.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose
    .connect(db)
    .then(()=> console.log('DB ok'))
    .catch((err)=> console.log('DB error', err))

app.get('/', (req, res) => {
  console.log(`URL: ${req.url}`);
  res.send('Hello, Server!');
});

app.get('/profile/:id', UserContr.getprofile);
app.post('/pill', (req, res)=>
{
    console.log(req.body);
    //const token = jwt.sign({
      //  name: req.body.name
    //}, 'secret123');//шифрование
    res.json({success:true});
})
app.post('/profile', registerValidation, UserContr.register);

app.post('/profile/log', registerValidation, async (req, res)=>
{
    try
    {const user = await userModel.findOne({name: req.body.email})
    if(!user){
        return req.status(404).json({
            message:"нет"
        })
    }

}
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось зарегистрировать"
        });
    }
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});
