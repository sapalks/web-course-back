const express = require('express');
const passport = require("passport");
const authorizationRoutes = require('./routes/authorizationRoutes');
const port = process.env.PORT || 3000
const app = express();

app.use('/', authorizationRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});