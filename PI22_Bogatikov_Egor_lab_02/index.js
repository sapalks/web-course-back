const express = require('express');
const bodyParser = require('body-parser');
const shaurmaRouter = require('./routes/shaurma.routes');
const fillingRouter = require('./routes/filling.routes');
const port = 5678

const app = express();

app.use(bodyParser.json());

app.use("/", shaurmaRouter);
app.use("/", fillingRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});