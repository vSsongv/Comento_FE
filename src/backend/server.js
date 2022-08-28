const express = require("express");
const httpd = require("http");
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
httpd.createServer(app).listen(process.env.PORT, function () {
  console.log("listening on " + process.env.PORT);
});

app.get("/", function (req, res) {
  res.send("success");
});

app.use("/answer", require("./answer"));
