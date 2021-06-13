const express = require('express');
const bodyParser = require('body-parser');
const classRouter = require('./routes/class.routes');
const vehicleRouter = require('./routes/vehicle.routes');
const port = 8000

const app = express();

app.use(bodyParser.json());

app.use("/", classRouter);
app.use("/", vehicleRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});