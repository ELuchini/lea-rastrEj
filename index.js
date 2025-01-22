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

let userDatabase = [];
let exerciseDatabase = [];

app
  .post("/api/users", (req, res) => {
    let username = req.body.username;
    let userId = (userDatabase.length + 7777777).toString();
    let newUser = {
      username: username,
      _id: userId,
    };

    userDatabase.push(newUser);
    res.json(newUser);
  })
  .get("/api/users", (req, res) => {
    res.json(userDatabase);
  });

app.post("/api/users/:_id/exercises", (req, res) => {
  let userId = req.params._id;
  let user = userDatabase.find((user) => user._id === userId);
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date;
  if (!date) {
    date = new Date().toISOString().slice(0, 10);
  }

  let exercise = {
    username: user.username,
    description: description,
    duration: parseInt(duration),
    _id: userId,
    date: new Date(date).toDateString(),
  };

  exerciseDatabase.push(exercise);
  res.json(exercise);
});

app.get("/api/users/:_id/logs", (req, res) => {
  let userId = req.params._id;
  let user = userDatabase.find((user) => user._id === userId);
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;

  let logs = exerciseDatabase.filter((exercise) => exercise._id === userId);

  if (from) {
    logs = logs.filter((exercise) => new Date(exercise.date) >= new Date(from));
  }

  if (to) {
    logs = logs.filter((exercise) => new Date(exercise.date) <= new Date(to));
  }

  if (limit) {
    logs = logs.slice(0, limit);
  }

  res.json({
    _id: userId,
    username: user.username,
    count: logs.length,
    log: logs,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
