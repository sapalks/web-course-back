const express = require('express')
const departmentRouter = require('./routes/department.routes')
const employeeRouter = require('./routes/employee.routes')
const authRouter = require('./routes/authentication.routes');
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./configurations/auth/yandexPassport')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['keys.session.cookieKey']
}));

app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', function (req, res) {
    res.render('index')
})

app.use("/", authRouter)
app.use("/", departmentRouter)
app.use("/", employeeRouter)

app.listen(port, function () {
    console.log("Server started on port " + port)
})