require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios"); //wasana

//Initialize express app
const app = express();

const connectDB = require("./config/db");

const auth = require("./middlewares/auth");

//middleware
app.use(express.json()); //sending repsonses in json format, this middleware will parse the data and send it in json format.

app.use(morgan("tiny")); //Morgan logs useful information about HTTP requests and responses, such as the request method, the URL, the status code, and the length of the response body

app.use(require("cors")()); //used in Authorization

const draftrouter = require("./routes/draftorder");
const orderrouter = require("./routes/managerorder");
const inquiryrouter = require("./routes/inquiry");
const loggingDeliveryrouter = require("./routes/loggingDelivery");
const supproductrouter = require("./routes/supProduct");
const suporderrouter = require("./routes/supOrderApproved");

const siteRouter = require("./routes/site"); // Import the site router
const invoiceRouter = require("./routes/invoice"); // Import the invoice router
const receiptRouter = require("./routes/reciept"); //Import the reciept router

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/api", require("./routes/auth"));

//Routes
app.use("/api", require("./routes/auth"));

// Site Manager
app.use("/api/", draftrouter);
app.use("/api/", orderrouter);
app.use("/api/", inquiryrouter);
app.use("/api/", loggingDeliveryrouter);

//Supplier
app.use("/api/", supproductrouter);
app.use("/api/", suporderrouter);

//Staff
app.use("/api/", siteRouter);
app.use("/api", invoiceRouter);
app.use("/api/", receiptRouter);

//server configurations.
const PORT = process.env.PORT || 8000; //3000 port we will use  for frontend
app.listen(PORT, async () => {
  //We dont want to start the server until we are connected to the database.
  //therefore we are going to use async await.
  //In the terminal we will see the message "server listening on port: 8000" only after we are connected to the database.
  try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
    //  User.insertMany(dataUser);
    //  Product.insertMany(dataProduct);
  } catch (err) {
    console.log(err);
  }
  //we dont want the error to shut down the server, therefore we are going to use try catch.
  //we catch the error and log it to the console.
});
