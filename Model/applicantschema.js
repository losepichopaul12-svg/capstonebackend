
import mongoose from "mongoose";

const  applicantschema =new mongoose.Schema({
      jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true
  },
     Jobtitle:{
        type:String,
        required:true
    },
    applicantname:{
        type:String,
        required:true
    },
    applicantemail:{
        type:String,
        required:true,
        unique: true
}
});
applicantschema.index({ jobId: 1, applicantemail: 1 }, { unique: true });
export default mongoose.model("Applications",applicantschema)