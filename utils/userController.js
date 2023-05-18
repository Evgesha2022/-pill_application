import {registerValidation} from '../validations/register.js'
import jwt  from 'jsonwebtoken';
import {validationResult}  from 'express-validator';
import userModel from '../models/user.js';
export const getprofile  = async (req, res)=>{
    try{
        const user = await userModel.findById(req.userId)
        if(!user){
            res.json({message:"такого пользователя нет"})
        }
        const token = jwt.sign({
            _id: user._id,
         }, "secret123",
         {
           expiresIn:"30d",
         });
       res.json({...user._doc, token,})
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Нет доступа"
        });
    }
}
export const register = async (req, res)=>
{
    try{const errors =validationResult(req)
    if (!errors.isEmpty()){
        return req.status(400).json(errors.array()) 
    }
    //шифрование пароля если надл будет
    //const password = req.body.password;
    //const salt = await bcrypt.genSalt(10);
    //const passwordhash = await bcrypt.hash(passworrd, salt)
    
    const doc  = new userModel({
        name:  req.body.name, 
        surname :  req.body.surname,
        birthday:  req.body.birthday
    });
    const user = await doc.save();
    const token = jwt.sign({
         _id:  user._id,
      }, "secret123",
      {
        expiresIn:"30d",
      });
    res.json({...user._doc, token,});}
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Не удалось зарегистрировать"
        });
    }
}
