const { ObjectID } = require("bson");
const  mongo  = require("../connect.js")
const  bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

module.exports.login=async (req,res,next)=>{
    console.log(req);
    try{
        
        const alreadyexists=(await mongo.selectedDB.collection("admin_user").findOne(
            {
                $and: [
                    {'email': req.body.email},
                    {'password': req.body.password},
                ]
            }
        ));
        if(!alreadyexists){
            return  res.status(400).send({"msg":"Invalid email and password.Check with Support Team"});
        }  
            //Generate and send token as response
            const token = jwt.sign(alreadyexists,process.env.SECRET_KEY, { expiresIn:'1h' });
            res.send(token);
       
      }catch(error){
         // console.error(error);
          res.status(500).send(error);
      }
    
}