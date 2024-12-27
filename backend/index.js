const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
const config = require("./config.json")
const checkAuth = require("./middleware/checkAuth")
const userRoute = require('./routes/userRoute')
const noteRoute = require('./routes/noteRoute')

mongoose.connect(config.connectionString).then(()=>console.log("DataBase connected.")).catch((error)=>{console.log("Error while connecting mongodb .",error)});

app.use(express.json())
app.use(cors());



app.use("/user",userRoute);

app.use('/note',checkAuth,noteRoute);
app.listen(8000,()=>{
    console.log("Server started at 8000.")
})
