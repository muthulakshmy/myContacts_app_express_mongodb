const express = require('express');
const mongoose = require('mongoose');

const errorHandler = require("./middleware/errorHandler")
const dotenv = require('dotenv').config();

const app=express();

const port = process.env.port || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes") );
app.use(errorHandler);

const MongoClient = require("mongodb").MongoClient
const client=new MongoClient("mongodb://0.0.0.0:27017/muthu");
client.connect()
.then(()=>{
  console.log("connected");
})
const db=client.db("muthu");
var coll=db.collection("user");


app.listen(port , ()=>{
    console.log(`Server running on ${port}`)
})
