console.log("Hi Express");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();

connectDb();

app.use(express.json()); // Express Midleware: To parse the client/Api request

const port = process.env.PORT || 5000;

app.use("/api/contacts", require("./Routes/contactRoute"));
app.use(errorHandler); //  to run globally

app.listen(port, () => {
  console.log(`Server Runing on Port ${port}`); // This Arrow function is a call back function
});
