import mongoose from "mongoose"

const Employerprofileschema= new mongoose.Schema({
 userid: {
  type: String,
  required: true,
  unique: true
},
    companyname:{
        type:String,
        required:false
    },
    companyemail:{
        type:String,
        required:false
    },
    companyphone:{
        type:String,
        required:false
    },
   companylocation:{
        type:String,
        required:false
    },
    companyindustry:{
        type:String,
        required:false
    },
    companydescription:{
        type:String,
        required:false
    }

})

export default  mongoose.model("Employerprofile",Employerprofileschema)