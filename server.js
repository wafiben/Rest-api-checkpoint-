const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
let userModel = require("./models/USER.JS");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("dotenv").config();
app.use(express.json());

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
  {
    firstName: "ali",
    lastName: "hamdi",
    email: "ali@gmail.com",
  },
  {
    firstName: "Amin",
    lastName: "nasri",
    email: "amine@gmail.com",
  },
  {
    firstName: "Asma",
    lastName: "benaloui",
    email: "asma@gmail.com",
  }
];
userModel
  .create(users)
  .then(() => {
    console.log("instance of objects done and saved on the database");
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/adduser", (req, res) => {
  console.log("adding new user ");
  const { firstName, lastName, email } = req.body;

  const newUser = new userModel({ firstName, lastName, email });
  newUser
    .save()
    .then((data) => {
      console.log("new user is saved " + data);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.put('/user/:id', function (req, res) {

  console.log('updating user')
  userModel.findByIdAndUpdate(req.params.id,req.body, {new: true}).then((data)=>{
    console.log(data)
    res.send(data)
  })
})
app.delete('/deletuser/:id',(req,res)=>{
  userModel.findByIdAndDelete(req.params.id,(error,data)=>{
    if(error){
      console.log(error)
    }
    res.send('this '+data+' has been deleted')
  })
})
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("the server has been started on port  " + process.env.PORT);
});
