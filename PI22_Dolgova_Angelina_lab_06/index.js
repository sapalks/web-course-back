const express = require('express')
const app = express()
const port = 3000
const passport = require('passport');
const oauthRouter = require('./routes/oauthorization.routes');


app.use(express.json());
app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(express.static('views'));
app.use('/', oauthRouter)

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App is listening at http://localhost:${port}. Go to SignIn: http://localhost:${port}/main`);
});