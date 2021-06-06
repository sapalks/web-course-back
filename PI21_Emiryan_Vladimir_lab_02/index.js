const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
    res.send('HELLO POSTGRES + NODEJS!!!!!!!!')
}) 

app.listen(PORT, () => console.log(`server started on post ${PORT}`))