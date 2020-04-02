const router = require("express-promise-router")();
const usersController = require("../controllers/users");

// Routes for all 
router.route("/all").get(usersController.all);

module.exports = router;
