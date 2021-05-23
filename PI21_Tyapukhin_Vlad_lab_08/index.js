const express = require('express')
const port = 3000
const app = express()
const chatRouter = require('./routes/chatRTS')

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.use('/', chatRouter)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});