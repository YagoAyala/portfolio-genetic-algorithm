const express = require("express");
const router = express.Router();
const securityController = require("../controllers/security.controller");

router.post("/login", securityController.login);
router.put("/user_update", securityController.userUpdate);
router.put("/password_update", securityController.updatedPassowordUser);
router.post("/create_access_token", securityController.createAccessToken);
router.post("/verify_access_token", securityController.verifyAccessToken);

module.exports = router;
