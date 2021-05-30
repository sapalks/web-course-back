const express = require('express')
const authorsRoutes = require('./routes/author.route.js')
const picturesRoutes = require('./routes/picture.route.js')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const csp = require('helmet-csp')

app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))

app.use(function(req, res, next) {
    res.set("Content-Security-Policy", "default-src 'self'");
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});

app.get('/ping', (req, res) => {
    res.json({
        status: 'ok',
        time: new Date().toUTCString()
    })
})

app.get('/', (req, res) => {
  res.json({
      status: 'ok',
      time: new Date().toUTCString()
  })
})

app.listen(PORT, () => {
    console.log('Сервер доступен по адресу http://localhost:%d', PORT)
})

app.use('/', authorsRoutes)
app.use('/', picturesRoutes)