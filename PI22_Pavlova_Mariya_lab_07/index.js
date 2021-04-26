import { Dropbox } from 'dropbox'
import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = process.env.PORT || 5000
app.set('view engine', 'ejs')
app.listen(port, () => {
    console.log('Server has been started');
})

const urlencodedParser = bodyParser.urlencoded({extended : false});

app.set('view engine', 'ejs')
app.use(bodyParser .json());
app.use(urlencodedParser)

const dbx = new Dropbox({
    accessToken: 'xzb-J0pd8ygAAAAAAAAAAcjnhPQ3YaoaB6mQ3Xhye7uvt77a_UgyaA_cw9UYpP_G',
    fetch
})

app.get('/files', (req, res) => {
    dbx.filesListFolder({
        PATH: ''
    }).then(json => {
        res.render('files', {result: json.result})
    })
})


