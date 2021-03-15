const express = require('express');
const departmentRouter = require('./routes/department.routes');
const employeeRouter = require('./routes/employee.routes');
const passport = require('passport');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", departmentRouter);
app.use("/", employeeRouter);

app.listen(port, function () {
    console.log("Server started on port " + port);
})