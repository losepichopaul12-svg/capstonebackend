import mongoose from "mongoose";

const Usersschema=new mongoose.Schema({
   name:{
      type:String,
      required:[true,'please add name']
   },
   email:{
      type:String,
      required:[true,'please type Email'],
      unique: true
   },
   password:{
      type:String,
      required:[true,'please add password']
   },
   role:{
      type:String,
      required:[true,'please select role'],
      default:"jobseeker"
   },
   gender:{
      type:String,
      required:[true,'please select gender']
   },
   phonenumber:{
      type:String,
      required:[true,'please add phone number']
   },
 resetPasswordToken: {
    type: String
    },
resetPasswordExpire: {
    type: Date
    }
},
  {
      timestamps:true,
   })

export default mongoose.model("users",Usersschema)