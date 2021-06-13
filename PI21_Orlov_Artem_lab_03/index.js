const express = require('express');
const app = express();
const port = 8080;

const brandRouter = require('./Routes/brand.routes.js');
const carRouter = require('./Routes/car.routes');

app.use(express.json());
app.use("/", brandRouter);
app.use("/", carRouter);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
