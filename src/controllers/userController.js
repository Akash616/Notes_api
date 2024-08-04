const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {

    // Existing User Check - 1 step
    // Hashed Password - 2 step
    // User Creation - 3 step
    // Token Generate - 4step

    const {username, email, password} = req.body;
    try{

        //1
        const existingUser = await userModel.findOne({email : email}); //filter
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        //2
        const hashedPassword = await bcrypt.hash(password, 10); //10 or 12 -> salt round

        //3
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        //4
        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);

        res.status(201).json({user: result, token: token}); //201 successfully record created

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const signin = async (req, res) => {

    const {email, password} = req.body;
    try {
        
        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(404).json({message : "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);
        
        res.status(200).json({user: existingUser, token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = {signup, signin};