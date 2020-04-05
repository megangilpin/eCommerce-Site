const router = require("express").Router();
const apiController = require("../controllers/api");

router.route("/all").get(apiController.all);

module.exports = router;
