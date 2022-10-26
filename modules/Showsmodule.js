const { ObjectID } = require("bson");
const  mongo  = require("../connect.js");
const { ObjectId } = require("mongodb");
  
module.exports.createShows=async(req,res,next)=>{ 
    alreadyexists=(await mongo.selectedDB.collection("shows").findOne(
        {
            $and: [
                {'show_id': req.body.show_details.show_id},
                {'theatre_id': req.body.show_details.theatre_id},
                {'movie_id': req.body.show_details.movie_id},
                {'show_date_time': (req.body.show_details.show_date_time)},
            ]
        }
    ));

    if(alreadyexists){
        res.send({"msg":'Show time already exists'});
    }else{

    try{
      responseInserted = await mongo.selectedDB.collection("shows").insertOne(req.body.show_details);
      res.send({"msg":'Show created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }
}
};

module.exports.updateShows=async (req,res,next)=>{
    
    try{
        const id=req.params.id;
        const updatedData= await mongo.selectedDB.collection("shows").findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.show_details} },
        { returnDocument: "after" },   
        );
        res.send({"msg":'shows updated successfully'});
    }  catch(error){
        res.status(500).send(error);
    } 
       
};
    
module.exports.getShows= async(req,res,next)=>{
    const id=req.params.id;
    try{
     getShowsdetail = await mongo.selectedDB.collection("shows").findOne({ _id: ObjectId(id) });
     res.send({show_details:getShowsdetail});
    }catch(error){ 
        res.status(500).send(error);
    }
};

module.exports.getMovieshows= async(req,res,next)=>{
    const movie_id=parseInt(req.params.id);
    try{

        listBookedshows = await mongo.selectedDB.collection("theatres").aggregate([
            {
              "$lookup": {
                "from": "shows",
                "localField": "theatre_id",
                "foreignField": "theatre_id",
                "as": "shows"
              }
            },
            {
              $match: {
                "shows.movie_id": movie_id
              }
            }
          ]).toArray();
        res.send(listBookedshows);
       }catch(error){ 
           res.status(500).send(error);
       }

};

module.exports.listShows= async(req,res,next)=>{
    try{

        listBookedshows = await mongo.selectedDB.collection("shows").aggregate(
           [
               {
                   $lookup: {
                       from: 'theatres',
                       localField : 'theatre_id',
                       foreignField: 'theatre_id',
                       as: 'shows_theatre_data'
                   }
               }, {
            $unwind:"$shows_theatre_data"
             },
             {
                $lookup:{
                   from:"movies",
                   localField:"movie_id",
                   foreignField:"movie_id",
                   as:"movies_data"
                }
             }, {
                $unwind:"$movies_data"
                 },
        
             {
                "$project": {
                  "shows_theatre_data.theatre_name": 1.0,
                  "show_date_time": 1.0,
                  "movies_data.movie_name": 1.0, // dont get anything                  
                }
              },
           ]
       ).toArray();
        res.send(listBookedshows);
       }catch(error){ 
           res.status(500).send(error);
       }
};

module.exports.getShowsbydatemovie= async(req,res,next)=>{
   /*const movie_id= req.body.movie_id;  const search_date= req.body.search_date;
   //console.log(new Date(search_date));
    try{

        listBookedshows = await mongo.selectedDB.collection("shows").aggregate([
            { "$match": { "movie_id": movie_id ,"show_date_time":search_date }},
            { "$lookup": {
              "from": "movies",
              "let": { "movie_id": "$movie_id","show_date_time":"$show_date_time" },
                pipeline: [
                                  {
                                      $match: {
                                                  $and: [
                                                       {
                                                          "$expr": { "$eq": ["$$movie_id", "$movie_id" ] },
                                                       },
                                                      {
                                                          $expr: {
                                                              $gte: ["$show_date_time", "$$show_date_time"],
                                                          },
                                                      },
                                                      {
                                                          $expr: {
                                                              $lte: ["$show_date_time", "$$show_date_time"],
                                                          }
                                                      }
                                                 
                                          ]
                                      }
                                  }
                              ],
                              as: "dailyenergylogs"
            }},
            {
                             $lookup: {
                                 from: 'theatres',
                                 localField : 'theatre_id',
                                 foreignField: 'theatre_id',
                                 as: 'shows_theatre_data'
                             }
                         },
            { "$project": { "_id": 1, "movie_id": 1, "theatre_id": 1, "shows_theatre_data.theatre_name":1,"shows_theatre_data.theatre_address":1,"shows_theatre_data.theatre_city":1    }}
          ]
       ).toArray();
        res.send(listBookedshows);
       }catch(error){ 
           res.status(500).send(error);
       }*/
};

module.exports.listShowsbymovie= async(req,res,next)=>{

};


module.exports.deleteShows=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const deletedData= await mongo.selectedDB.collection("shows")
        .remove({ _id: ObjectId(id) });
        res.send({"msg":'shows deleted successfully'});
    }  catch(error){
        res.status(500).send(error);
    } 
};

module.exports.showsCount=async(req,res,next)=>{
    try{
        const countsData= await mongo.selectedDB.collection("shows").countDocuments({})+1;
        res.send({countsData});
    }  catch(error){
        res.status(500).send(error);
    } 
};