const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const schoolboyRouter = require('./routes/schoolboyRouter')
const directionRouter = require('./routes/directionRouter')
const userRouter = require('./routes/userRouter')

app.use(express.json());
app.use(passport.initialize())
require('./conf/passport')(passport)

app.use('', schoolboyRouter);
app.use('', directionRouter);
app.use('', userRouter);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});