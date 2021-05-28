var express = require('express');
var bodyParser = require('body-parser');
var departmentRouter = require('./routes/department.routes');
var employeeRouter = require('./routes/employee.routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", departmentRouter);
app.use("/", employeeRouter);

app.listen(8080, function() {
    console.log("Server started on port " + 8080);
})