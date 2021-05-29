const express = require('express');
const bodyParser = require('body-parser');
const classRouter = require('./routes/class.routes');
const carRouter = require('./routes/car.routes');
const port = 4000

const app = express();

app.use(bodyParser.json());

app.use("/", classRouter);
app.use("/", carRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});