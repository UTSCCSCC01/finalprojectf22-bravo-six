const express = require("express");
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
require("dotenv").config();
const MuscleGroupModel = require('./models/Workouts');

//connect database
connectDB();

app.use(express.json());
app.use(cors());

app.post("/CreateWorkouts",async (req,res)=>{
    const WorkLog = req.body;
    const NewWorkLog = new MuscleGroupModel(WorkLog);
    await NewWorkLog.save();

    res.json(WorkLog);
});

app.listen(3001,() => {
    console.log("Sever Runs");
});

