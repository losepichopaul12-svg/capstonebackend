import mongoose from "mongoose"

const jobschema=new mongoose.Schema({
    userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
    Jobtitle:{
        type:String,
        required:true
    },
    Employer:{
        type:String,
        required:true
    },
    Employeremail:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Jobtype:{
        type:String,
        required:true  
    },
    Date:{
        type:Date,
        required:true
    },
    Salary:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    }
})

export default mongoose.model("Jobs",jobschema)