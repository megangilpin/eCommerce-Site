const router = require("express").Router();
const profileController = require("../controllers/profile.js");

router.route("/address").post(profileController.address); //adds address

module.exports = router;
