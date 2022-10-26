const { ObjectID } = require("bson");
const  mongo  = require("../connect.js")
const  bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const nodemailer = require('nodemailer');


module.exports.forgotPassword = ()=>{
//create random string
//store the random string for the particular user in the database
//email and random string =>  email@gmail.com 0909809
//http://localhost:3001/register/changePassword/kvib987897
}

module.exports.changePassword = (req,res)=>{
//validate whether the random string in the url param  === random string in the database
//else: expired url   
//get the password and confirm password from req.body
//validate the password
//hash and store password in DB
//delete the random string for the user in database

}

module.exports.signup=async (req,res,next)=>{
    try{

        const validation = Joi.object({
      
            user_name: Joi.string().min(5).max(30).trim(true).required(),                        
            mobile_number: Joi.string().min(5).max(50).trim(true).required(), 
            email: Joi.string().email().min(5).max(50).trim(true).required(), 
            password: Joi.string().min(5).max(50).trim(true).required(), 
            confirm_password: Joi.string().min(5).max(50).trim(true).required(),    
        });

           const {error }= validation.validate(req.body);
           if(error){
            return  res.status(400).send({"msg":error.message});
           }

        checkEmailExists = await mongo.selectedDB.collection("users").findOne({ email:req.body.email });
        if(checkEmailExists){
          return  res.status(400).send({"msg":"You are already a registered user"});
        }            
         const isSamePassword= checkPassword(req.body.password,req.body.confirm_password); 
         if(!isSamePassword){
            return  res.status(400).send({"msg":"passwords doesnt match"});
         }else{
             delete req.body.confirm_password;
         }
         //password encryption
          const randomString = await bcrypt.genSalt(10);  
          req.body.password = await bcrypt.hash(req.body.password,randomString);
         
          //save in DB  
          responseInserted = await mongo.selectedDB.collection("users").insertOne({...req.body});
          res.send(responseInserted);
      }catch(error){
          console.error(error);
          res.status(500).send(error);
      }
  
}
const checkPassword =(password,confirm_password)=>{
    return password!==confirm_password? false:true;
}

module.exports.signin=async (req,res,next)=>{
    console.log(req);
    try{
        //check user email already exists
        const checkUserexists = await mongo.selectedDB.collection("users").findOne({ email:req.body.email });
        if(!checkUserexists){
            return  res.status(400).send({"msg":"You are not a registered user. Pls sign-up to register"});
        }  

        //password decrypt using bcrypt but by hash we cant decrypt
       const isValidpassword = await bcrypt.compare(req.body.password,checkUserexists.password);
       //validate password     
       if(!isValidpassword){
        return  res.status(400).send({"msg":"Incorrect Password"});
       }

       //Generate and send token as response
        const token = jwt.sign(checkUserexists,process.env.SECRET_KEY, { expiresIn:'1h' });
        res.send(token);
      }catch(error){
         // console.error(error);
          res.status(500).send(error);
      }
    
}