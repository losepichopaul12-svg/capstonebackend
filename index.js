import express, { request }  from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import users from "./Model/Usersschema.js";
import Jobs from "./Model/jobschema.js";
import auth from "./Auth.js";
import authorize from "./Authorization.js";
// Application APIs
import ApplicationAPI from "./Router/ApplicationAPI.js";
// jobseeker API s
import JobseekerAPI from "./Router/JobseekerAPI.js";
// employer API `s 
import EmployerAPI from "./Router/EmployerAPI.js"
// Admin APIs
import Adminprofile from "./Model/Adminprofileschema.js"



const app=express();    
app.use(express.json());  
app.use(cors());
dotenv.config();

const secret="jwt"
// API`s
// API for registering the user and quarying details to the database.
app.post("/usersdetail",async(request,response)=>{
    console.log("request is",request.body)
    try{
      const hashedpassword=await bcrypt.hash(request.body.password,12);
      console.log("the hashed password is",hashedpassword);
   const newuser={
   name:request.body.name,
   email:request.body.email.toLowerCase(),
   password:hashedpassword,
   role:request.body.role,
   gender:request.body.gender,
   phonenumber:request.body.phonenumber
      }
const saveduser=await users.create(newuser);
    return response.json({status:"00",message:"user account  created successfully",data:saveduser})
    }
    catch(err){
        console.log(err)
        return response.json({status:"01",message:"An error occureed.......try again later",data:null})
    }
    
});

// Login API
app.post("/login",async (request,response)=>{
  console.log("the login request is:",request.body.email);
  const saveduser= await users.findOne({email:request.body.email.toLowerCase()});
  console.log("The Fetched user from database is:",saveduser.role);
  if(saveduser){
    if( await bcrypt.compare (request.body.password,saveduser.password)){
      const token=jsonwebtoken.sign({user:{id:saveduser._id,name:saveduser.name,email:saveduser.email,role:saveduser.role}},secret,{expiresIn:"15m"})
      return response.json({status:"00",  role:saveduser.role, id:saveduser._id, message:"Login successfull",token:token});
    }else{
      return response.json({status:"01", message:"wrong credentials"})
    }
  }else {
    return response.json({status:"01",message:"wrong credentials"})
  }
})

//API for sending  New job post by  employer.
app.post("/newpost", async (request, response) => {
  console.log(request.body);

  try {
    const jobpost = await Jobs.create({
      ...req.body,
      userid: req.body.userid,   // employer id
      Employeremail: req.body.Employeremail
    });

    return response.status(200).json({message: "job data created successfully",data: jobpost});

  } catch (error) {
    console.log(error);
    return response.status(400).json({message: "error occurred... try later to upload the job"});
  }
});

// API for fetching jobs from the  from the database.
app.get("/fetch-jobs",auth,  async(request, response)=>{
  console.log("the request from the backend is")
    try{
      const email = request.user.user.email;
      console.log("email from token is: ", request.user.user.email);
        const newjobs = await Jobs.find({Employeremail:email});
        return response.status(200).json({message:"New jobs Fetched successfully",data:newjobs});
    }
    catch(err){
        return response.status(400).json({message:"Some error occurred"});
    }
});

// API for fetching all employers jobs 
app.get("/fetch-alljobs", async(request, response)=>{
  console.log("the request from the backend is")
    try{
        const alljobs = await Jobs.find();
        return response.status(200).json({message:"All jobs posted fetched successfully",data:alljobs});
    }
    catch(err){
      console.log(err)
      return response.status(400).json({message:"Some error occurred"});
    }
});





// job application application api

app.use("/api",ApplicationAPI);
app.use("/Api",ApplicationAPI);
app.use("/status",ApplicationAPI);


// Jobseeeker API s 
app.use("/jobseeker",JobseekerAPI)
// Employer API s
app.use("/employer",EmployerAPI)

// Admin API for sending details
app.post("/admindetails",async(request,response)=>{
   console.log(request.body)
  try{
    const newdetails= await Adminprofile.create(request.body);
    return response.status(200).json({message:"Admin profile submitted successfully" ,data:newdetails})
  }
  catch(error){
console.log(error)
return response.status(400).json({message:"error occured................. try later to send the details"})
  }
})
// API for fetching users from the  from the database.
app.get("/fetch-users", async(request, response)=>{
  console.log("the request from the backend is")
    try{
        const newusers = await users.find();
        return response.status(200).json({message:"job cards list Fetched successfully",data:newusers});
    }
    catch(err){
      console.log(err)
      return response.status(400).json({message:"Some error occurred"});
    }
});

// API for deleting job that does not meet all requirement by admin
app.delete("/delete-job/:id", async (req,res)=>{

  try{
    await Jobs.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"job deleted successfully"})

  }catch(error){
 res.status(500).json({message:"Error deleting job"})
}

});



// API  for  blocking the user by admin
app.put("/block-user/:id", async (req,res)=>{

  try{

    const blockedUser = await users.findByIdAndUpdate(
      req.params.id,
      {status:"Blocked"},{new:true});

    res.status(200).json({message:"User blocked successfully",data:blockedUser})

  }catch(error){
res.status(500).json({message:"Error blocking user"});
  }
});


// api for deleting the user by admin
app.delete("/delete-user/:id", async (req,res)=>{

  try{
    await users.findByIdAndDelete(req.params.id)
 res.status(200).json({ message:"User deleted successfully"});
  }catch(error){
 res.status(500).json({message:"Error deleting user"})
}
});


// user Forget password API 


const PORT=8082;
const DBURL="mongodb+srv://LosepichoPaul:nyFvT4lCu2KgRuOE@cluster0.q8xcghk.mongodb.net/CAPSTONE-DB"

mongoose.connect(DBURL).then(()=>{
    console.log("Connected to the Database successfully")
    app.listen(PORT,()=>{
        console.log(`The Server is running on Port:${PORT}`)
    })
})