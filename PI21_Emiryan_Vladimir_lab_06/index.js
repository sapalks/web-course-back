const express = require('express');
const authorizationRoutes = require('./authorizationRoutes.js');
const port = process.env.PORT || 3000
const app = express();

app.get('/ping', (req, res) => {
    res.json( `Server is working`);
});

app.use('/', authorizationRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});