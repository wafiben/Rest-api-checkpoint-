const express = require("express");
const mongoose = require("mongoose");
let userModel = require("./models/USER.JS");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("dotenv").config();
mongoose
  .connect("mongodb+srv://wafi:54900777@cluster0.qxhos.mongodb.net/test", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("you are connected");
  })
  .catch((error) => {
    console.log(error);
  });
  let users = [
    { firstName: "wafi", lastName: 'benjeddou', email: 'wafibenjeddou@gmail.com'},
    { firstName: "Amin", lastName:'nasri', email: 'amine@gmail.com'},
    { firstName: "Asma", lastName: 'benaloui', email: 'asma@gmail.com'}
  ];
  userModel
  .create(users)
  .then(() => {
    console.log("instance of objects done and saved on the database");
  })
  .catch((error) => {
    console.log(error);
  });
  app.get('/', (req, res) => {
      userModel.find({}).then((users)=>{
       res.send(users)
      }).catch((error)=>{
          console.log(error)
      })
  })
  app.post('/add-user',(req,res)=>{
      res.send('hey')
  })
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("the server has been started on port  " + process.env.PORT);
});
