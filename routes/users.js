const router = require("express").Router()
const usersController = require("../controllers/users");

// Routes for all 
router.route("/all").get(usersController.all);

module.exports = router;
