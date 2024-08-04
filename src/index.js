//console.log("Hello Akash");
const express = require("express"); //library import
const app = express(); //application object
//const quotes = require("./quotes.json");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
const dotenv = require("dotenv");
const cors = require("cors"); //middleware

dotenv.config(); //.env file read

const mongoose = require("mongoose");

app.use(express.json()); //req.body covert into json (parse) -> it's also a middleware

// app.use((req, res, next)=>{ //middleware for Authentication - Security guard
//     console.log("HTTP Method - "+req.method+" , URL - "+req.url);
//     next();
// });

app.use(cors()); //api call from anywhere

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) =>{
    res.send("Notes API From Akash");
});

// app.get("/quote", (req, res) =>{
//     res.status(200).json(quotes);
// });

// app.get("/random", (req, res) =>{
//     let index = Math.floor(Math.random() * quotes.length);
//     let quote = quotes[index];
//     res.status(200).json(quote);
// });

const PORT = process.env.PORT || 5000; //process.env.PORT - standard

mongoose.connect(process.env.MONGO_URL)
.then(()=>{ //callback function
    app.listen(PORT, ()=>{
        console.log("Server started on port no. " + PORT);    
    });
})
.catch((error)=>{ //callback function
    console.log(error);
}) 
