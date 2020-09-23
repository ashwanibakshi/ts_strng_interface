import express from "express";
import mongoose from "mongoose";
import Iuser from "../interface/userInterface";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
});

const user = mongoose.model<Iuser>('users',userSchema);
export default user;