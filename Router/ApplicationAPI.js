import express from "express";
const router=express.Router();
// import application schema
import Applications from "../Model/applicantschema.js";
import Jobs from "../Model/jobschema.js";


// api for sending job application to the database 
router.post("/sendapplication", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const job = await Jobs.findById(req.body.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await Applications.create({
      jobId: job._id,
      Jobtitle: job.Jobtitle,
      applicantname: req.body.applicantname,
      applicantemail: req.body.applicantemail,
      userid: req.body.userid,             // applicant
      EmployerId: job.userid,              // Employeridfrom job
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

router.get("/getapplicant",async(request,response)=>{
   console.log("the request from the backend is")
      try{
          const newapplicants = await Applications.find();
          return response.status(200).json({message:"New applicants Fetched successfully",data:newapplicants});
      }
      catch(err){
          return response.status(400).json({message:"Some error occurred"});
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