const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const Ticketbookingrouter = require("./router/Ticketbookingrouter");
const registerrouter = require("./Router/registerRouter");
const adminrouter = require("./Router/adminRouter");
const mongo_connection = require("./connect");
const auth = require("./modules/authModule");


dotenv.config();
mongo_connection.connect();

const app=express();
app.use(cors());

app.use(express.json());

app.use('https://ticketbooking-system.herokuapp.com/register',registerrouter); 
app.use('https://ticketbooking-system.herokuapp.com/admin',adminrouter); 
app.use('https://ticketbooking-system.herokuapp.com/ticketbooking',Ticketbookingrouter); 
app.use('https://ticketbooking-system.herokuapp.com/',auth.authenticateUser); 

app.listen(process.env.PORT);
