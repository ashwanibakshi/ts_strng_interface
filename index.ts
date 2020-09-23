import express, { Application,Request,Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Iuser from "./interface/userInterface";
import user from "./models/userModel";

mongoose.connect('mongodb://localhost:27017/loginout',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('conect error '+err))

const app:Application = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.post('/register',async (req:Request,res:Response)=>{
    try {
        const userr =  new user({
            email:req.body.email,
            password:req.body.password
        });
          const response = await userr.save();
          if(response){
          res.json({da:response});
          }
    } catch (error) {
      console.log(error);
    }
});

app.post('/login',async (req:Request,res:Response)=>{
    try {
    const response:Iuser[] = await user.find({$and:[{'email':req.body.email,'password':req.body.password}]});
    if(response){
      res.json({da:response});
    }
    } catch (error) {
        console.log(error);
    }
});

app.get('/registerUser',async (req:Request,res:Response)=>{
       try {
        const response:Iuser[] = await user.find();
        if(response){
            res.json({da:response});
        }
       } catch (error) {
        console.log(error);
       }
});

const port  = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));