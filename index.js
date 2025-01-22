const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

database = [];

app
  .post("/api/users", (req, res) => {
    let username = req.body.username;
    let userId = (database.length + 7777777).toString();
    let newUser = {
      username: username,
      _id: userId,
    };

    database.push(newUser);
    res.json(newUser);
  })
  .get("/api/users", (req, res) => {
    res.json(database);
  });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
