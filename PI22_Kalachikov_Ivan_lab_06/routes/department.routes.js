const Router = require("express");
const router = new Router();
const departmentController = require("../controllers/department.controller");
const passport = require("passport");

router.post("/department", passport.authenticate('yandex', {session: false}), departmentController.createDepartment)
router.get("/department", departmentController.getDepartments)
router.get("/department/:id", departmentController.getDepartment)
router.put("/department", passport.authenticate('yandex', {session: false}), departmentController.updateDepartment)
router.delete("/department/:id", passport.authenticate('yandex', {session: false}), departmentController.deleteDepartment)

module.exports = router;