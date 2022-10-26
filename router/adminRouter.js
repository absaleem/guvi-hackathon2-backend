const express=require("express");
const router=express.Router();
const adminModule= require("../modules/Adminmodule");

router.post("/login",adminModule.login);

module.exports=  router; 