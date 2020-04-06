const router = require("express").Router();
const apiController = require("../controllers/api.js");

router.route("/all").get(apiController.all);

module.exports = router;
