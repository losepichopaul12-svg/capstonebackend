import express from "express";
const router=express.Router();

import Jobseekerprofile from "../Model/jobseekerprofileschema.js";
import Applications from "../Model/applicantschema.js"
import auth from "../Auth.js";
// API for sending job seeker profile details to the database 
router.post("/jobseekerprofile", async (request, response) => {
  try {
    const { userid } = request.body;

    let jobseeker = await Jobseekerprofile.findOne({ userid });

    if (jobseeker) {
      // UPDATE
      jobseeker = await Jobseekerprofile.findByIdAndUpdate(
        jobseeker._id,
        request.body,
        { new: true }
      );
    } else {
      // CREATE
      jobseeker = await Jobseekerprofile.create(request.body);
    }

    return response.status(200).json({
      message: "Profile saved successfully",
      data: jobseeker
    });

  } catch (err) {
    console.log(err);
    return response.status(400).json({
      message: "Error saving profile"
    });
  }
});

// API for fetching jobseeker profile from the backend 
router.post("/fetch-jobseekerprofile", async (request, response) => {
  try {
    const { userid } = request.body;

    const profile = await Jobseekerprofile.findOne({ userid });

    return response.status(200).json({
      message: "Profile fetched successfully",
      data: profile
    });

  } catch (err) {
    console.log(err);
    return response.status(400).json({
      message: "Error fetching profile"
    });
  }
});


// API for fetching already applied jobs applications
router.get("/myapplications", auth, async (request, response) => {
  try {
    const userId = request.user.user.id; // from token

    const myApps = await Applications.find({
      userid: userId
    }).populate("jobId"); // shows job details

    return response.status(200).json({
      message: "Your applications fetched successfully",
      data: myApps
    });

  } catch (err) {
    return response.status(400).json({
      message: "Error fetching your applications"
    });
  }
});
export default router;