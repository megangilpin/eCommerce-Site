const router = require("express").Router()
const usersController = require("../controllers/users");

// Routes for all 
router.route("/all").get(usersController.all);
router.route("/validate").post(usersController.validate);

module.exports = router;
