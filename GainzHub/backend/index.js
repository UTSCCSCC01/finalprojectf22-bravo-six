const express = require("express");
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const foodRoutes = require("./routes/foodRoutes");
require("dotenv").config();

//connect database
connectDB();

app.use(express.json());
app.use(cors());

//tell express to use these routes

app.use("/auth", require('./routes/authRoutes'));
app.use("/change", require("./routes/changeRoutes"));
app.use("/nutrition", require("./routes/foodRoutes"));
app.use("/getCals", require("./routes/getCalorieRoutes"))
app.use("/development", require('./routes/developmentRoutes'));
app.use("/addMealPlan", require("./routes/addMealPlanRoutes"));
app.use("/getPMP", require("./routes/getPersonalMealPlansRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

