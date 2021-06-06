const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { Dropbox } = require("dropbox");
const port = 5000;
const token =
  "lT0_yffz4LwAAAAAAAAAAZMk-NN-uHQZe4Zn8zvFR0_zIvMM8Z4kI0s6l1E2P_Fr";

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/upload", function (req, res) {
  res.render("upload");
});

app.get("/dropbox", async function (req, res) {
  const dropbox = new Dropbox({
    accessToken: token,
  });
  let filesListFolder = (await dropbox.filesListFolder({ path: "" })).result
    .entries;

  folders = filesListFolder.filter((file) => file[".tag"] == "folder");
  files = filesListFolder.filter((file) => file[".tag"] == "file");

  res.render("app-folder", { folders: folders, files: files });
});

app.get("/download", async function (req, res) {
  const dbx = new Dropbox({ accessToken: token });
  console.log(req.query);

  const url = (await dbx.sharingCreateSharedLink({ path: req.query.path }))
    .result.url;
  console.log(url);

  dbx.sharingGetSharedLinkFile({ url: url }).then((data) => {
    console.log(data.result.name);
    fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
      if (err) throw err;
    });
  });
  res.render("download", { url: url });
});

app.get("/uploading", function (req, res) {
  console.log("body: ", req.query);
  const fileName = req.query.filename;
  console.log(
    fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length)
  );
  const dbx = new Dropbox({ accessToken: token });
  fs.readFile(fileName, (err, contents) => {
    if (err) throw err;

    dbx
      .filesUpload({
        path:
          "/" +
          fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length),
        contents,
      })
      .then((json) => {
        res.redirect("/dropbox");
      })
      .catch((uploadErr) => {
        console.log(uploadErr);
      });
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
