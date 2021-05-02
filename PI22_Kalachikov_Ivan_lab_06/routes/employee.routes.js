var Router = require("express");
var router = new Router();
var employeeController = require("../controllers/employee.contoller");
const passport = require("passport");

router.post("/employee", ensureAuthenticated, employeeController.createEmployee)
router.get("/employees", ensureAuthenticated, employeeController.getEmployees)
router.get("/employees/:dep_id", ensureAuthenticated, employeeController.getEmployeesOnDepartment)
router.get("/employee/:id", ensureAuthenticated, employeeController.getEmployee)
router.put("/employee", ensureAuthenticated, employeeController.updateEmployee)
router.delete("/employee/:id", ensureAuthenticated, employeeController.deleteEmployee)

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

module.exports = router;