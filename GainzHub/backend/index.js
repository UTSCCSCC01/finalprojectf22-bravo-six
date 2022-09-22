const express = require("express");
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

//connect database
connectDB();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

