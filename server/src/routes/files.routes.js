const express = require("express");
const router = express.Router();
const filesController = require("../controllers/files.controller");

router.post("/save_file", filesController.saveFile);
router.get("/get_files", filesController.getFiles);

module.exports = router;
