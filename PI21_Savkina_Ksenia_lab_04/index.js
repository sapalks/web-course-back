const express = require('express');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const customerRouter = require('./routes/customer.route');

const app = express();
const port = 3000;
const passport = require('passport');

app.use(express.json());
app.use(passport.initialize())
require('./passport')(passport)

app.use("/", postRouter);
app.use("/", commentRouter);
app.use("/", customerRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})