const express = require("express");
const req = require("express/lib/request");
const { signup, signin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

// userRouter.post("/signup", (req, res)=>{
//     res.send("SignUp");
// });

// userRouter.post("/signin", (req, res)=>{
//     res.send("SignIn");
// });

module.exports = userRouter; //access anywhere