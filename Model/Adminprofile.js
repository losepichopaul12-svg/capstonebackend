import mongoose from "mongoose";

const Adminprofileschema=new mongoose.Schema({
 
    adminname:{
        type:String,
        required:false
    },
      adminemail:{
        type:String,
        required:false
      },
      adminposition:{
        type:String,
        required:false
      },
      adminphone:{
        type:String,
        required:false
      }
     
})
export default mongoose.model("Adminprofile",Adminprofileschema);