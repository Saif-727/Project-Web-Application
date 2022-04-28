const express = require("express");
require("colors");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");

const connectDB = require("./config/DB");

const port = process.env.port || 8000; 

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/trainess", require("./Routes/trainessRoutes")); 
app.use("/trainer", require("./Routes/trainerRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));


app.listen(port, () => console.log(`Server is Started on ${port}`.yellow.bold));
