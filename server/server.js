const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const postRoute = require("./routes/postRoutes");

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
//route
app.use("/api", postRoute);

//database
connectDB = async (url) => {
  try {
    conn = await mongoose.connect(url);
    console.log(`Database connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB(process.env.MONGO_URI);
//port
const PORT = process.env.PORT || 8000;

//app.listen
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
