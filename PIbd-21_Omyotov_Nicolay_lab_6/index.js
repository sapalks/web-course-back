const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const passport = require("passport");
const app = express();
const port = 3000;

const YANDEX_CLIENT_ID = "4cb615bc5a194e59a97eafe427431b2a";
const YANDEX_CLIENT_SECRET = "98d908ff83424662ab67fc6f617a600c";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./passport")(passport);

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

app.get("/auth", function (req, res) {
  res.sendFile(__dirname + "/views/auth.html");
});

app.get("/auth/yandex", passport.authenticate("yandex"));

app.get("/auth/result", function (req, res) {
  const code = req.query.code;
  const options = {
    body: `grant_type=authorization_code&client_id=${YANDEX_CLIENT_ID}&client_secret=${YANDEX_CLIENT_SECRET}&code=${code}`,
    method: "post",
  };
  fetch("https://oauth.yandex.ru/token", options)
    .then((res) => res.json())
    .then((data) =>
      res.render("tokens.html", {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      })
    );
});

app.post("/auth/refreshToken", function (req, res) {
  const options = {
    body: `grant_type=refresh_token&client_id=${YANDEX_CLIENT_ID}&client_secret=${YANDEX_CLIENT_SECRET}&refresh_token=${req.body.refresh_token}`,
    method: "post",
  };
  fetch("https://oauth.yandex.ru/token", options)
    .then((res) => res.json())
    .then((data) =>
      res.render("tokens.html", {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      })
    );
});

app.post("/info", function (req, res) {
  fetch(
    `https://login.yandex.ru/info?format=json&with_openid_identity=1&oauth_token=${req.body.access_token}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.render("info.html", {
        login: JSON.stringify(data.login),
        realName: JSON.stringify(data.real_name),
        email: JSON.stringify(data.default_email),
      });
    });
});
