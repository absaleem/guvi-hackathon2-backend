const express=require("express");
const router=express.Router();
const Theatremodule= require("../modules/Theatremodule");
const Moviemodule= require("../modules/Moviemodule");
const Showsmodule= require("../modules/Showsmodule");

router.post("/createTheatre",Theatremodule.createTheatre);
router.get("/getTheatre/:id",Theatremodule.getTheatre);
router.put("/updateTheatre/:id",Theatremodule.updateTheatre);
router.get("/listTheatres",Theatremodule.listTheatres);
router.delete("/deleteTheatre/:id",Theatremodule.deleteTheatre);
router.get("/theatresCount",Theatremodule.theatresCount);


router.post("/createMovie",Moviemodule.createMovie);
router.get("/getMovie/:id",Moviemodule.getMovie);
router.put("/updateMovie/:id",Moviemodule.updateMovie);
router.get("/listMovies",Moviemodule.listMovies);
router.get("/moviesCount",Moviemodule.moviesCount);
router.delete("/deleteMovie/:id",Moviemodule.deleteMovie);

router.post("/createShows",Showsmodule.createShows);
router.get("/getShows/:id",Showsmodule.getShows);
router.put("/updateShows/:id",Showsmodule.updateShows);
router.get("/listShows",Showsmodule.listShows);
router.get("/showsCount",Showsmodule.showsCount);
router.post("/getShowsbydatemovie/:id",Showsmodule.getShowsbydatemovie);
router.delete("/deleteShows/:id",Showsmodule.deleteShows);
router.get("/getMovieshows/:id",Showsmodule.getMovieshows);


module.exports=  router;