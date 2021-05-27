const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const classRouter = require('./routes/class.routes');
const carRouter = require('./routes/car.routes');
const port = process.env.PORT || 3000
const userRouter = require('./routes/user.routes')
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize())
require('./configurations/passport')(passport)


app.use("/", classRouter);
app.use("/", carRouter);
app.use("/", userRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});