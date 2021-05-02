var Router = require("express");
var router = new Router();
var employeeController = require("../controllers/employee.contoller");
const passport = require("passport");

router.post("/employee", passport.authenticate('yandex', {session: false}), employeeController.createEmployee)
router.get("/employees", employeeController.getEmployees)
router.get("/employees/:dep_id", employeeController.getEmployeesOnDepartment)
router.get("/employee/:id", employeeController.getEmployee)
router.put("/employee", passport.authenticate('yandex', {session: false}), employeeController.updateEmployee)
router.delete("/employee/:id", passport.authenticate('yandex', {session: false}), employeeController.deleteEmployee)

module.exports = router;