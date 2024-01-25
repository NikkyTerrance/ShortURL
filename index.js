const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { json } = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();




const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=> console.log(`server started in port: ${PORT}`));


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : ['http://localhost:3000','https://zomely.netlify.app'],
    optionsSuccessStatus: 200,
    credentials: true
}));


app.get("/test", (req,res)=>{
    res.send("it works");
    console.log("Works");
});




//mongo connection

mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Connected to DB");
    }).catch((e)=>{
        console.log("error:", e);
    });

//router setup


app.use("/auth", require("./routers/userRouter"));
app.use("/short", require("./routers/shorturlRouter"));
app.use("/:shortUrl", require("./routers/shorturlRouter"));