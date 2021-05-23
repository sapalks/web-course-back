var Router = require("express");
var router = new Router();
var departmentContoller = require("../controllers/department.controller");

router.post("/department", departmentContoller.createDepartment)
router.get("/department", departmentContoller.getDepartments)
router.get("/department/:id", departmentContoller.getDepartment)
router.put("/department", departmentContoller.updateDepartment)
router.delete("/department/:id", departmentContoller.deleteDepartment)

module.exports = router;