const Router = require("express");
const router = new Router();
const departmentController = require("../controllers/department.controller");

router.get("/department", ensureAuthenticated, departmentController.getDepartments)
router.get("/department/:id", ensureAuthenticated, departmentController.getDepartment)
router.post("/department", ensureAuthenticated, departmentController.createDepartment)
router.put("/department", ensureAuthenticated, departmentController.updateDepartment)
router.delete("/department/:id", ensureAuthenticated, departmentController.deleteDepartment)

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

module.exports = router;