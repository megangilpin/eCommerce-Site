const router = require("express").Router();
const authController = require("../controllers/auth.js");

router.route("/login").post(authController.login);
router.route("/validate").post(authController.validate);

module.exports = router;
