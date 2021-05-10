var Router = require("express");
var router = new Router();
var customerContoller = require("../controllers/customer.controller");

router.post("/register", customerContoller.registerCustomer)
router.post("/login", customerContoller.loginCustomer)


module.exports = router;