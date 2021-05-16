const express = require('express')
const app = express()
const port = 5333

const productRouter = require('./routes/product')
const grouppRouter = require('./routes/groupp')
const clientRouter = require('./routes/client')
const passport = require("passport")

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/api', productRouter);
app.use('/api', grouppRouter);
app.use('/api', clientRouter);