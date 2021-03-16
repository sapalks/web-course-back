var Router = require("express");
var router = new Router();
var employeeController = require("../controllers/employee.contoller");
const passport = require("passport");

router.post("/employee", passport.authenticate('jwt', {session: false}), employeeController.createEmployee)
router.get("/employees", employeeController.getEmployees)
router.get("/employees/:dep_id", employeeController.getEmployeesOnDepartment)
router.get("/employee/:id", passport.authenticate('jwt', {session: false}), employeeController.getEmployee)
router.put("/employee", passport.authenticate('jwt', {session: false}), employeeController.updateEmployee)
router.delete("/employee/:id", passport.authenticate('jwt', {session: false}), employeeController.deleteEmployee)

module.exports = router;