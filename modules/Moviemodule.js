const { ObjectID } = require("bson");
const  mongo  = require("../connect.js");
const { ObjectId } = require("mongodb");
  
module.exports.createMovie=async(req,res,next)=>{


    alreadyexists=(await mongo.selectedDB.collection("movies").findOne(
                {'movie_name': req.body.movie_details.movie_name},
            
    ));

    if(alreadyexists){
        res.send({"msg":'Movie name already exists'});
    }else{

    try{
      responseInserted = await mongo.selectedDB.collection("movies").insertOne(req.body.movie_details);
      res.send({"msg":'Movie created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }
}
};

module.exports.updateMovie=async (req,res,next)=>{
    
    try{
        const id=req.params.id;
        const updatedData= await mongo.selectedDB.collection("movies").findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.movie_details} },
        { returnDocument: "after" },   
        );
        res.send({"msg":'Movie updated successfully'});
    }  catch(error){
        res.status(500).send(error);
    } 
       
    };
    


module.exports.getMovie= async(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    try{

     getMoviesdetail = await mongo.selectedDB.collection("movies").findOne({ _id: ObjectId(id) });
     res.send({movie_details:getMoviesdetail});
    }catch(error){ 
        res.status(500).send(error);
    }
};

module.exports.listMovies= async(req,res,next)=>{
    try{

     list_Theatres = await mongo.selectedDB.collection("movies").find().toArray();
     res.send(list_Theatres);
    }catch(error){ 
        res.status(500).send(error);
    }
};



module.exports.deleteMovie=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const deletedData= await mongo.selectedDB.collection("movies")
        .remove({ _id: ObjectId(id) });
        res.send({"msg":'Movie deleted successfully'});
    }  catch(error){
        res.status(500).send(error);
    } 
};

module.exports.moviesCount=async(req,res,next)=>{
    try{
        const countsData= await mongo.selectedDB.collection("movies").countDocuments({})+1;
        res.send({countsData});
    }  catch(error){
        res.status(500).send(error);
    } 
};