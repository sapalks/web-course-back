const express = require("express");
const app = express();
const port = 5000;
const CHATS = [];
const USERS = [];

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("views"));

//
// Routes
//
app.get("/", (_, res) => {
  res.render("entrance");
});

app.get("/enter", function (req, res) {
  if (!req.query.userName) {
    res.sendStatus(422).send("Missing userName");
  }
  if (USERS.findIndex((name) => name == req.query.userName) != -1) {
    res.sendStatus(409);
  }
  USERS.push(req.query.userName);
  res.sendStatus(200);
});

app.get("/chats", function (req, res) {
  res.render("chats.ejs", { userName: req.query.userName, chats: CHATS });
});

app.get("/chats", function (req, res) {
  res.render("chats.ejs", { userName: req.query.userName, chats: CHATS });
});

//
// Launch
//
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
