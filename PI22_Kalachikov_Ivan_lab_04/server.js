const express = require('express');
const departmentRouter = require('./routes/department.routes');
const employeeRouter = require('./routes/employee.routes');
const authRouter = require('./routes/authentication.routes');
const passport = require('passport');
const strategy = require('./configurations/jwtStrategy');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use(strategy)
app.use(passport.initialize());


app.use("/", authRouter);
app.use("/", departmentRouter);
app.use("/", employeeRouter);

app.listen(port, function () {
    console.log("Server started on port " + port);
})