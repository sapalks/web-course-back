const express = require('express');
const departmentRouter = require('./routes/department.routes');
const employeeRouter = require('./routes/employee.routes');
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", departmentRouter);
app.use("/", employeeRouter);

app.listen(PORT, function() {
    console.log("Server started on port " + PORT);
})