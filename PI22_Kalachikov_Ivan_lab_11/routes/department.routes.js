const Router = require("express");
const router = new Router();
const departmentController = require("../controller/department.controller");

router.post("/department", departmentController.createDepartment)
router.get("/department", departmentController.getDepartments)
router.get("/department/:id", departmentController.getDepartment)
router.put("/department", departmentController.updateDepartment)
router.delete("/department/:id", departmentController.deleteDepartment)
router.get("/cached", departmentController.isCached)

module.exports = router;