const express = require("express");
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const foodRoutes = require("./routes/nutritionRoutes");
var bodyParser = require('body-parser')
const { createBucketProfilePictureBucket, createSocialBucket, uploadImage } = require("./config/awsS3");
require("dotenv").config();

//Create AWS buckets, should be commented out, only rerun if the buckets need to be re-created
//createSocialBucket();
//createBucketProfilePictureBucket();

//connect database
connectDB();

//app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:"50mb", extended:true}))
app.use(cors());

//tell express to use these routes
app.use("/auth", require('./routes/authRoutes'));
app.use("/nutrition", require("./routes/nutritionRoutes"));
app.use("/development", require('./routes/developmentRoutes'));
app.use("/user", require("./routes/userRoutes"));
app.use("/social", require("./routes/SocialRoutes"));
app.use("/progress", require("./routes/progressRoutes"));
app.use("/workout", require("./routes/workoutRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

