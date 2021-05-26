const express = require('express')
const app = express()
const path = require('path')
const port = 8100
const oauthRouter = require('./routes/oauth.route');


app.get('/ping', (req, res) => {
    res.json( `Server is working on port ${port}`);
});
app.set('view engine', 'ejs')
app.use(express.static('views'));

app.use('/', oauthRouter)

app.get('/img', (req, res) => {
    res.sendFile(path.join(__dirname, './img/Timofey.jpg'));
})
app.listen(port, () => {
    console.log(`Started at: http://localhost:${port}/main`);
});