const express = require("express");
const router = express.Router();

const securityRouter = require("./security.routes");
const paymentRouter = require("./payment.routes");
const filesRouter = require("./files.routes");
const contestsRouter = require("./contests.routes");

router.use("/contests", contestsRouter);
router.use("/files", filesRouter);
router.use("/security", securityRouter);
router.use("/payment", paymentRouter);

module.exports = router;
