const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})