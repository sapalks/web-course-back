const express = require('express');
const bodyParser = require('body-parser');
const topicRouter = require('./routes/topic.routes');
const bookRouter = require('./routes/book.routes');
const port = 3000

const app = express();

app.use(bodyParser.json());

app.use("/", topicRouter);
app.use("/", bookRouter);

app.listen(port, () => {
    console.log('Server has been started!');
    console.log(`App listening at http://localhost:${port}`)
});