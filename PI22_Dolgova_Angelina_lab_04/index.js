const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const topicRouter = require('./routes/topic.routes');
const bookRouter = require('./routes/book.routes');
const port = 3000
const authRouter = require('./routes/authorization.routes')
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize())
require('./configurations/passport')(passport)


app.use("/", topicRouter);
app.use("/", bookRouter);
app.use("/", authRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});