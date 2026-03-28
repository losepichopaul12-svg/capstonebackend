import express from "express";
import mongoose from "mongoose";  
const router=express.Router();
// import application schema
import Applications from "../Model/applicantschema.js";
import Jobs from "../Model/jobschema.js";
import auth from "../Auth.js";


// api for sending job application to the database 
router.post("/sendapplication", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const job = await Jobs.findById(req.body.jobId);

     if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure job has a valid employer
    if (!job.userid) {
      return res.status(400).json({ message: "Cannot apply: Job has no employer assigned" });
    }

    const application = await Applications.create({
  jobId: job._id,
  Jobtitle: job.Jobtitle,
  applicantname: req.body.applicantname,
  applicantemail: req.body.applicantemail,
  userid:new  mongoose.Types.ObjectId(req.body.userid),  
  EmployerId:new  mongoose.Types.ObjectId(job.userid),   
   Employeremail: job.Employeremail
    });

    return res.status(200).json({
      message: "Application sent successfully",
      data: application
    });

  } catch (error) {
    console.log("FULL ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You already applied for this job"
      });
    }

    return res.status(400).json({
      message: error.message
    });
  }
});
// API for fetching job applicants from the database

router.get("/getapplicant", auth, async (request, response) => {
  try {
    const employerId = request.user.user.id; 

    const applicants = await Applications.find({
      EmployerId: employerId
    });

    return response.status(200).json({
      message: "Applicants fetched successfully",
      data: applicants
    });

  } catch (err) {
    return response.status(400).json({
      message: "Some error occurred"
    });
  }
});


// API for updating applicant status
router.put("/update-status/:id", async (request, response) => {

  try {

    const updated = await Applications.findByIdAndUpdate(
      request.params.id,
      { status: request.body.status },
      { new: true }
    );

   return  response.status(200).json(updated);

  } catch (err) {
    response.status(400).json({ message: "Status update failed" });
  }

});


export default router;