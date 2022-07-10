const express = require("express");
const app = express();
const mongoose = require("mongoose");
const post_routes = require("./controller/post/routes");
const user_routes = require("./controller/user/routes");
const profile_routes = require("./controller/profile/routes");
const comment_routes = require("./controller/comment/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// db_uri =
//   "mongodb+srv://shivamG:shivam_2306@cluster0.vuim5.mongodb.net/instagram?retryWrites=true&w=majority";
db_uri = process.env.DB_URI;

mongoose
  .connect(db_uri)
  .then((res) => {
    console.log("connected to db");
    const server = http.createServer(app);
    server.listen(5000, () => {
      console.log("listening at 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "its working" });
});

app.use("/post/", post_routes);
app.use("/profile", profile_routes);
app.use("/comment", comment_routes);
app.use("/user/", user_routes);
