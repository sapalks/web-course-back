const express = require('express');
const bodyParser = require('body-parser');
const departmentRouter = require('./routes/department.routes');
const employeeRouter = require('./routes/employee.routes');
const port = process.env.PORT || 8080

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", departmentRouter);
app.use("/", employeeRouter);

app.listen(port, function() {
    console.log("Server started on port " + port);
})