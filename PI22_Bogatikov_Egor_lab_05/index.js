const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const shaurmaRouter = require('./routes/shaurma.routes');
const fillingRouter = require('./routes/filling.routes');
const port = process.env.PORT || 5678
const authRouter = require('./routes/authorization.routes')
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize())
require('./configurations/passport')(passport)


app.use("/", shaurmaRouter);
app.use("/", fillingRouter);
app.use("/", authRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});