
import mongoose from "mongoose";

const  applicantschema =new mongoose.Schema({
    jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true
  },

  userid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
  required: true
},

  EmployerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
  required: true
},

  Employeremail: {
    type: String,
    required: true
  },

  Jobtitle: {
    type: String,
    required: true
  },

  applicantname : {
    type: String,
    required: true
  },

  applicantemail: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Shortlisted", "Rejected"],
    default: "Pending"
  }
});

// Prevent Duplicate applications
applicantschema.index({ jobId: 1, applicantemail: 1 }, { unique: true });
export default mongoose.model("Applications",applicantschema)