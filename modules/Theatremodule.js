const { ObjectID } = require("bson");
const  mongo  = require("../connect.js");
const { ObjectId } = require("mongodb");
  
module.exports.createTheatre=async(req,res,next)=>{

    alreadyexists=(await mongo.selectedDB.collection("theatres").findOne(
        {
            $and: [
                {'theatre_name': req.body.theatre_details.theatre_name},
                {'theatre_city': req.body.theatre_details.theatre_city},
                {'theatre_state': req.body.theatre_details.theatre_state},
                {'theatre_pincode': req.body.theatre_details.theatre_pincode},
            ]
        }
    ));

    if(alreadyexists){
        res.send({"msg":'Theatre name already exists in this city, state and pincode'});
    }else{

    try{
      responseInserted = await mongo.selectedDB.collection("theatres").insertOne(req.body.theatre_details);
      res.send({"msg":'Theatre created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }
}
};

module.exports.updateTheatre=async (req,res,next)=>{
    
    try{
        const id=req.params.id;
    //    console.log(id);
        console.log(req.body.theatre_details);
        const updatedData= await mongo.selectedDB.collection("theatres").findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.theatre_details} },
        { returnDocument: "after" },   
        );
        res.send({"msg":'Theatre updated successfully'});
    }  catch(error){
        res.status(500).send(error);
    } 
       
    };
    

module.exports.getTheatre= async(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    try{

     getTheatresdetail = await mongo.selectedDB.collection("theatres").findOne({ _id: ObjectId(id) });
     res.send({theatre_details:getTheatresdetail});
    }catch(error){ 
        res.status(500).send(error);
    }
};

module.exports.listTheatres= async(req,res,next)=>{
    try{

     list_Theatres = await mongo.selectedDB.collection("theatres").find().toArray();
     res.send(list_Theatres);
    }catch(error){ 
        res.status(500).send(error);
    }
};

module.exports.theatresCount=async(req,res,next)=>{
    try{
        const countsData= await mongo.selectedDB.collection("theatres").countDocuments({})+1;
        res.send({countsData});
    }  catch(error){
        res.status(500).send(error);
    } 
};

module.exports.deleteTheatre=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const deletedData= await mongo.selectedDB.collection("theatres")
        .remove({ _id: ObjectId(id) });
        res.send({"msg":'Theatre deleted successfully'});
    
    }  catch(error){
        res.status(500).send(error);
    } 
};