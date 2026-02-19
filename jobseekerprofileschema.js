import mongoose from "mongoose";

const jobseekerprofileschema=new mongoose.Schema({
  userid:{
    type:String,
    required:true,
    unique:true
  },
    fullnames:{
        type:String,
        required:false
    },
      email:{
        type:String,
        required:false
      },
      location:{
        type:String,
        required:false
      },
      phone:{
        type:String,
        required:false
      },
      biodata:{
        type:String,
        required:false
      },
      skills:{
        type:String,
        required:false
      },
      portfolio:{
        type:String,
        required:false
      },
      cvurl:{
        type:String,
        required:false
      },
})
export default mongoose.model("Jobseekerprofile",jobseekerprofileschema);