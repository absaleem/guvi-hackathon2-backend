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

app.use('/register',registerrouter); 
app.use('/admin',adminrouter); 
app.use('/ticketbooking',Ticketbookingrouter); 
app.use('/',auth.authenticateUser); 

app.listen(process.env.PORT);
