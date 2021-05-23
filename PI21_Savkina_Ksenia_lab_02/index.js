const express = require('express');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');

const app = express();
const port = 3000

app.use(express.json());

app.use("/", postRouter);
app.use("/", commentRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})