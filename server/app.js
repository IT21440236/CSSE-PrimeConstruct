require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //pasindu
const axios = require("axios"); //wasana

//Initialize express app
const app = express();

const connectDB = require("./config/db");

const auth = require("./middlewares/auth");

//middleware
app.use(express.json()); //sending repsonses in json format, this middleware will parse the data and send it in json format.

app.use(morgan("tiny")); //Morgan logs useful information about HTTP requests and responses, such as the request method, the URL, the status code, and the length of the response body

app.use(require("cors")()); //used in Authorization

const draftrouter = require("./routes/draftorder")
const orderrouter = require("./routes/managerorder")
const inquiryrouter = require("./routes/inquiry")
const supproductrouter = require("./routes/supProduct")
const suporderrouter = require("./routes/supOrderApproved")



//routes
app.use("/api", require("./routes/auth"));
app.use("/api/", require("./routes/contact"));
app.use("/api/", require("./routes/employee"));
app.use("/api/", require("./routes/salary"));
app.use("/api/", require("./routes/attendance"));
// app.use("/api/", require("./routes/report"));

//if our token was valid then we will have the user in the request object.
// app.get("/protected", auth, (req, res) => {s
//     return res.status(200).json({ ...req.user._doc });
// });

//Pasindu***************************************************************************
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes/deliveries"));
app.use("/api", require("./routes/schedules"));
app.use("/api", require("./routes/deliveryreport"));

//Pasindu***************************************************************************

//Yasitha***************************************************************************

//Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/stock"));
app.use("/api", require("./routes/profit"));
app.use("/api", require("./routes/stockreport"));

//Yasitha***************************************************************************

// Site Manager
app.use("/api/", draftrouter);
app.use("/api/", orderrouter);
app.use("/api/", inquiryrouter);

app.use("/api/", supproductrouter);
app.use("/api/", suporderrouter);

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
