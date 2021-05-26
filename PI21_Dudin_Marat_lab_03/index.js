const express = require('express')
const app = express()
const port = 3000
const schoolboyRouter = require('./routes/schoolboyRouter')
const directionRouter = require('./routes/directionRouter')

app.use(express.json());
app.use('', schoolboyRouter);
app.use('', directionRouter);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});