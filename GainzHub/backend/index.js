const express = require("express");
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
require("dotenv").config();

//connect database
connectDB();

app.use(express.json());
app.use(cors());

//tell express to use these routes

app.use("/auth", require('./routes/authRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

