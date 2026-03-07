import mongoose from "mongoose";

const Adminprofileschema=new mongoose.Schema({
name:{
      type:String,
      required:[true,'please add name']
   },
   email:{
      type:String,
      required:[true,'please type Email'],
      unique: true
   },
   position:{
      type:String,
      required:[true,'please add position']
   },
   phone:{
      type:String,
      required:[true,'please add phone'],
   },
})

export default mongoose.model("Adminprofile",Adminprofileschema);