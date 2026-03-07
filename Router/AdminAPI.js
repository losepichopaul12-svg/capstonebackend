import express from "express";
const router=express.Router();
import Adminprofile from "../Model/Adminprofile.js";
import users from "../Model/Usersschema.js";

router.post("/sendadmindetails",async(request,response)=>{
    console.log("sending admin details to the database",request.body);
    try{
         const adminprofile= await users.create(request.body);
         return response.status(200).json({message:"Admin profile created successfuly" ,data:adminprofile})
       }
       catch(error){
     console.log(error)
     return response.status(400).json({message:"error occured................. try later to fill the form"})
       }
});

// fetching users
router.get("/fetch-users", async(request, response)=>{
  console.log("the request from the backend is")
    try{
        const users = await Adminprofile.find();
        return response.status(200).json({message:"users list fetched successfully",data:users});
    }
    catch(err){
        return response.status(400).json({message:"Some error occurred while fetching users "});
    }
})

export default router;


