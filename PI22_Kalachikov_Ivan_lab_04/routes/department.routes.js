var Router = require("express");
var router = new Router();
var departmentController = require("../controllers/department.controller");
const passport = require("passport");

router.post("/department", passport.authenticate('jwt', {session: false}), departmentController.createDepartment)
router.get("/department", departmentController.getDepartments)
router.get("/department/:id", departmentController.getDepartment)
router.put("/department", passport.authenticate('jwt', {session: false}), departmentController.updateDepartment)
router.delete("/department/:id", passport.authenticate('jwt', {session: false}), departmentController.deleteDepartment)

module.exports = router;