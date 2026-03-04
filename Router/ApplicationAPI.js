import express, { request } from "express";
const router=express.Router();
// import application schema
import Applications from "../Model/applicantschema.js";

// api for sending job application to the database 
router.post("/sendapplication",async(request,response)=>{
    console.log(request.body)
     try{
       const applications= await Applications.create(request.body);
       return response.status(200).json({message:"job applications  created successfuly" ,data:applications})
     }
     catch(error){
   console.log(error)
   return response.status(400).json({message:"error occured................. try later to apply  the job"})
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
})

export default router;