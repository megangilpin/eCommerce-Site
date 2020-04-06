const router = require("express").Router()
const usersController = require("../controllers/users");

// Routes for all 
router.route("/all").get(usersController.all);
router.route("/validate").post(usersController.validate);
router.route("/register").post(usersController.register); //registers user
module.exports = router;
