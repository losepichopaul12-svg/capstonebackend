import mongoose from "mongoose"

const Employerprofileschema= new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    companyemail:{
        type:String,
        required:true
    },
    companyphone:{
        type:String,
        required:true
    },
   companylocation:{
        type:String,
        required:true
    },
    companyindustry:{
        type:String,
        required:true
    },
    companydescription:{
        type:String,
        required:true
    }

})

export default  mongoose.model("Employerprofile",Employerprofileschema)