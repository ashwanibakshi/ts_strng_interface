import mongoose from "mongoose";

export default interface Iuser extends mongoose.Document {
    email:string,
    password:string
}