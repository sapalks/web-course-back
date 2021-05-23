import { Dropbox } from 'dropbox'
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import multer from "multer";
const upload = multer();
const type = upload.single('file')
const port = process.env.DEV_SERVER_PORT || 5000;
const app = express();
app.use('/static', express.static('static'))
app.use(bodyParser.json());



// Запуск сервера
app.listen(port, () => {
    console.log("Server has been started port=${port}...")
})

app.get('/', function(req, res){
    res.sendFile(__dirname + "/static/index.html");
});

const dbx = new Dropbox({
    accessToken: 'sl.AxXq2YaqDi_xI-4xwEirLVmrulft8pHw7kv2q2IjIn9myNGu4lWjKhURRUKFyrJoWa6gvfXz8hhLSAn60Yomb-8gIu6ZSE7UxC4c_1RbFLy80LcVzBivNCJFIgFpw246JDbNMDD5OCyF',
    fetch
})

app.get('/files', (req, res) => {
    dbx.filesListFolder({
        path: ''
    }).then(json => {
        res.send(json.result.entries);
    })
})

app.post('/upload-file', type, (req, res) => {
    const file = req.file;
    dbx.filesUpload({path: '/' + file.originalname, contents: file})
        .then(function(response) {
            res.send({data: response});
        })
        .catch(function(error) {
            res.send({error})
        });
});