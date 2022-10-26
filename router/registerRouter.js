const express=require("express");
const router=express.Router();
const registerModule= require("../modules/Register");

router.post("/signup",registerModule.signup);
router.post("/signin",registerModule.signin);
router.post("/forgotPassword/:",registerModule.forgotPassword)
router.post("/changePassword/:randomstring",registerModule.changePassword)


module.exports=  router; 