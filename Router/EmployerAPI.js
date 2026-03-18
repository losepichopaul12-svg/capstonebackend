import express from "express";
const router=express.Router();
import Employerprofile from "../Model/employerprofileschema.js";

// API for sending employer profile details to the database 
router.post("/employerprofile", async (request, response) => {
  try {
    const { userid } = request.body;
if (!userid) {
      return response.status(400).json({
        message: "User ID is required"
      });
    }
    let employer = await Employerprofile.findOne({ userid });

    if (employer) {
      // UPDATE
      employer= await Employerprofile.findByIdAndUpdate(
        employer._id,
        request.body,
        { new: true }
      );
    } else {
      // CREATE
      employer = await Employerprofile.create(request.body);
    }

    return response.status(200).json({
      message: "Profile saved successfully",
      data: employer
    });

  } catch (err) {
  console.log("FULL ERROR:", err);

  return response.status(400).json({
    message: err.message
  });
}
});

// API for fetching employer profile from the backend 
router.post("/fetch-employerprofile", async (request, response) => {
  try {
    const { userid } = request.body;

    const profile = await Employerprofile.findOne({ userid });

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

export default router;