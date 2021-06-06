const express = require('express')
const app = express()
const port = 3000
const passport = require('passport');
const oauthRouter = require('./routes/auth.routes');

app.use(express.json());
app.use(passport.initialize());
app.use(express.static('views'));
app.use('/', oauthRouter)

app.listen(port, () => {
    console.log(`Started at: http://localhost:${port}/main`);
});