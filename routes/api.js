const router = require("express").Router();
const apiController = require("../controllers/api.js");

router.route("/all").get(apiController.all);
router.route("/products").get(apiController.productSearch);

module.exports = router;
