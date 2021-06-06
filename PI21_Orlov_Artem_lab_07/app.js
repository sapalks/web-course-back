const express = require('express')
const app = express()
const controller = require('./controllers/controller')

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('views'));
app.use(express.json());

app.get('/', controller.home);
app.post('/', controller.postHome)
app.get('/auth', controller.auth)
app.post('/dropboxinfo', controller.getFiles)
app.get('/download', controller.downloadPage)
app.post('/download', controller.download)
app.get('/upload', controller.uploadPage)
app.post('/upload', controller.upload)


app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`)
});
