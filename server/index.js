var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");

const CLIENT_ID = "a960a6e0ad42e6cf104b";
const CLIENT_SECRET = "494ae857d59049d16d6f45441cbb90d37a0ec904";

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  // console.log(req.query.code);
  // const params = "?client_id?=" +  CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;  
  await fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    });
});

// getUserData
app.get("/getUserData", async function (req, res) {
  req.get("Authorization"); // Bearer ACCESSTOKEN
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization"), // Bearer ACCESSTOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    });
});

app.listen(4000, function () {
  console.log("CORS Running AT 4000");
});
