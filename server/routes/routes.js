
const router = require("express").Router();
const usersController = require("../controller/usersController");
const updateController = require("../controller/updateController");
const protectedRoute = require("../auth/token_validation");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/update", protectedRoute, updateController.updateData);

module.exports = router;