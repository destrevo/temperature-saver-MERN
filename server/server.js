const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');                                                
const userRouter = require("./routes/routes");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json({limit:'50mb'}));
app.use(cors());
app.use("/", userRouter)

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on PORT: ***", process.env.APP_PORT, "***")
})